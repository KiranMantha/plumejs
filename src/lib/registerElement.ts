import {
	klass,
	INPUT_METADATA_KEY,
	CSS_SHEET_NOT_SUPPORTED,
	isUndefined,
} from "./utils";
import { render } from "lighterhtml";
import { instantiate } from "./instance";
import { DecoratorOptions, jsonObject } from "./types";
import { augmentor } from "augmentor";
import { isNode } from "browser-or-node";
import { componentRegistry } from "./componentRegistry";
import { Subscription } from "rxjs";
import { Injector } from "../..";

const wrapper = (fn: Function, deps: Array<string>, props: any) => () =>
	instantiate(fn, deps, props);

const createSTyleTag = (content: string) => {
	let tag = document.createElement("style");
	tag.innerHTML = content;
	document.head.appendChild(tag);
	return tag;
};

const transformCSS = (styles: string, selector: string) => {
	if (styles) {
		styles = selector + " " + styles.toString().replace("}", ` } ${selector} `);
	}
	return styles;
};

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<string>,
	isRoot: boolean
) => {
	if (!isNode) {
		if (isRoot && !componentRegistry.isRootNodeSet && options.styles) {
			componentRegistry.isRootNodeSet = true;
			createSTyleTag(options.styles);
			componentRegistry.globalStyles.replace((options.styles || "").toString());
		} else if (isRoot && componentRegistry.isRootNodeSet) {
			throw Error(
				"Cannot register duplicate root component in " +
				options.selector +
				" component"
			);
		}
	}

	window.customElements.define(
		options.selector,
		class extends HTMLElement {
			render: Function;
			[klass]: jsonObject;
			private __properties: { [key: string]: any };
			private shadow: any;
			private translationSubscription: Subscription;
			private internalTranslationService: any;
			private triggerInputChanged: () => void;
			componentStyleTag: HTMLStyleElement = null;

			constructor() {
				super();
				let adoptedStyleSheets = [];
				options.useShadow = isUndefined(options.useShadow)
					? true
					: options.useShadow;
				if (!CSS_SHEET_NOT_SUPPORTED) {
					adoptedStyleSheets = isNode
						? []
						: componentRegistry.getComputedCss(
							options.useShadow,
							options.styles
						);
					if (isNode) {
						this.shadow = this;
					} else {
						this.shadow = options.useShadow
							? this.attachShadow({ mode: "open" })
							: this;
					}
					this.shadow.adoptedStyleSheets = adoptedStyleSheets;
				} else {
					options.useShadow = false;
					this.shadow = this;
				}
				const _inputprop: string = Reflect.getMetadata(INPUT_METADATA_KEY, target);
				this.__properties = {};
				if (_inputprop) {
					Object.defineProperty(this, _inputprop, {
						get: function () { return this.__properties[_inputprop]; },
						set: function (value) {
							let oldValue = this.__properties[_inputprop];
							let joldval = JSON.stringify(this.__properties[_inputprop]);
							let jnewval = JSON.stringify(value);
							this.__properties[_inputprop] = value;
							if (this.triggerInputChanged) {
								this.triggerInputChanged();
							} else {
								this.triggerInputChanged = () => {
									if (this.isConnected && joldval !== jnewval) {
										this[klass][_inputprop] = value;
										this[klass].inputChanged && this[klass].inputChanged(oldValue, value);
										this.update();
									}
								}
							}
						}
					});
				}
				this.internalTranslationService = Injector.get(
					"InternalTranslationService"
				);
			}

			private init() {
				let _returnfn = this[klass].render.bind(this[klass]);
				render.bind(this[klass], this.shadow, _returnfn)();
			}

			private emulateComponent() {
				if (
					!isNode &&
					CSS_SHEET_NOT_SUPPORTED &&
					options.styles &&
					!options.root
				) {
					let id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
					let compiledCSS = transformCSS(
						options.styles,
						`[data-cid="${id.toString()}"]`
					);
					this.componentStyleTag = createSTyleTag(compiledCSS);
					this.setAttribute("data-cid", id.toString());
				}
			}

			connectedCallback() {
				this.emulateComponent();
				const _inputprop: string = Reflect.getMetadata(INPUT_METADATA_KEY, target);
				this[klass] = augmentor(
					wrapper(target, providers, (this as any)[_inputprop])
				)();
				this[klass]["element"] = this.shadow;
				this[klass].beforeMount && this[klass].beforeMount();
				this.init();
				this[klass]["update"] = this.update.bind(this);
				this[klass].mount && this[klass].mount();
				this.triggerInputChanged && this.triggerInputChanged();
				this.translationSubscription = this.internalTranslationService.updateTranslations.subscribe(
					() => {
						this.update();
					}
				);
			}

			update = () => {
				this.init();
			};

			getModel = () => {
				return this[klass];
			};

			disconnectedCallback() {
				this.__properties = {};
				this.triggerInputChanged = null;
				this.translationSubscription.unsubscribe();
				this.componentStyleTag && this.componentStyleTag.remove();
				this[klass].unmount && this[klass].unmount();
			}
		}
	);
};

export { registerElement };
