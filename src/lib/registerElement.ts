import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml";
import { watch, unwatch } from "./watchObject";
import { instantiate } from "./instance";
import { DecoratorOptions, jsonObject } from "./types";
import { InternalTranslationService } from "./internalTranslationService";
import { augmentor } from "augmentor";
import { isNode } from 'browser-or-node';
import { componentRegistry } from './componentRegistry';

const wrapper = (fn: Function, deps: Array<string>, props: any) => () => instantiate(fn, deps, props);

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<string>,
	isRoot: boolean
) => {
	if (!isNode) {
		if (isRoot && ! componentRegistry.isRootNodeSet && options.styleUrl) {
			componentRegistry.isRootNodeSet = true;
			const styletag = document.createElement("style");
			let styles = componentRegistry.getCss(options.styleUrl);
			styletag.innerText = (styles || "").toString();
			componentRegistry.globalStyles.replace((styles || "").toString());
			document.getElementsByTagName("head")[0].appendChild(styletag);
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
			constructor() {
				super();
				if (isNode) {
					this.shadow = this;
				} else if (options.useShadow !== undefined) {
					this.shadow = !!options.useShadow === false ? this : this.attachShadow({ mode: "open" });
				} else {
					options.useShadow = true;
					this.shadow = this.attachShadow({ mode: "open" });
				}
				this.shadow.adoptedStyleSheets = isNode ? [] : componentRegistry.getComputedCss(options.useShadow, options.styleUrl);
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

			connectedCallback() {
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
				InternalTranslationService.translationComponents.delete(this);
				this._inputprop && unwatch(this);
				this[klass].unmount && this[klass].unmount();
			}
		});
};

export { registerElement };
