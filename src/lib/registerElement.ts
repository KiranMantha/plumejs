import { klass, INPUT_METADATA_KEY, CSS_SHEET_NOT_SUPPORTED, isUndefined } from "./utils";
import { render } from "lighterhtml";
import { watch, unwatch } from "./watchObject";
import { instantiate } from "./instance";
import { DecoratorOptions, jsonObject } from "./types";
import { InternalTranslationService } from "./internalTranslationService";
import { augmentor } from "augmentor";
import { isNode } from 'browser-or-node';
import { componentRegistry } from './componentRegistry';

const wrapper = (fn: Function, deps: Array<string>, props: any) => () => instantiate(fn, deps, props);

const createSTyleTag = (content: string) => { 
	let tag = document.createElement('style');
	tag.innerHTML = content;
	document.head.appendChild(tag);
	return tag;
}

const transformCSS = (styles: string, selector: string) => {
	if(styles) {
		styles = selector + ' ' + styles.toString().replace('}', ` } ${selector} `);
	}
	return styles;
}

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<string>,
	isRoot: boolean
) => {
	if (!isNode) {
		if (isRoot && ! componentRegistry.isRootNodeSet && options.styles) {
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
			private shadow: any;
			_inputprop: string;
			componentStyleTag:HTMLStyleElement = null;

			constructor() {
				super();
				let adoptedStyleSheets = [];
				options.useShadow = isUndefined(options.useShadow) ? true : options.useShadow;
				if(!CSS_SHEET_NOT_SUPPORTED) {
					adoptedStyleSheets = isNode ? [] : componentRegistry.getComputedCss(options.useShadow, options.styles);
					if (isNode) {
						this.shadow = this;
					} else {
						this.shadow = options.useShadow ? this.attachShadow({ mode: "open" }) : this;
					}
					this.shadow.adoptedStyleSheets = adoptedStyleSheets;
				} else {
					options.useShadow = false;
					this.shadow = this;
				}
				this._inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
				if (this._inputprop) {
					watch(this, this._inputprop, (oldvalue: any, newvalue: any) => {
						let joldval = JSON.stringify(oldvalue);
						let jnewval = JSON.stringify(newvalue);
						if (joldval !== jnewval) {
							if (this[klass] && this[klass][this._inputprop]) {
								this[klass][this._inputprop] = (this as any)[this._inputprop];
								this[klass].inputChanged && this[klass].inputChanged(oldvalue, newvalue);
								this.update();
							}
						}
					});
				}
			}

			private init() {
				let _returnfn = this[klass].render.bind(this[klass]);
				render.bind(this[klass], this.shadow, _returnfn)();
			}

			private emulateComponent() {
				if(CSS_SHEET_NOT_SUPPORTED && options.styles && !options.root) {
					let id = new Date().getTime();
					let compiledCSS = transformCSS(options.styles, `[data-cid="${id.toString()}"]`);
					this.componentStyleTag = createSTyleTag(compiledCSS);
					this.setAttribute('data-cid', id.toString());					
				}
			}

			connectedCallback() {
				this.emulateComponent();
				this[klass] = augmentor(wrapper(target, providers, (this as any)[this._inputprop]))();
				this[klass]["element"] = this.shadow;
				this[klass].beforeMount && this[klass].beforeMount();
				this.init();
				this[klass]["update"] = this.update.bind(this);
				this[klass].mount && this[klass].mount();
				InternalTranslationService.translationComponents.set(this, options.selector);
			}

			update = () => {
				this.init();
			};

			getModel = () => {
				return this[klass];
			};

			disconnectedCallback() {
				this.componentStyleTag && this.componentStyleTag.remove();
				InternalTranslationService.translationComponents.delete(this);
				this._inputprop && unwatch(this);
				this[klass].unmount && this[klass].unmount();
			}
		});
};

export { registerElement };
