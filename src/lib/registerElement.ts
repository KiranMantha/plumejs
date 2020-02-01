import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml";
import { watch, unwatch } from "./watchObject";
import { instantiate } from "./instance";
import { DecoratorOptions, jsonObject } from "./types";
import { InternalTranslationService } from "./translationService";
import { augmentor } from "augmentor";

let isRootNodeSet = false;
let globalStyles: any = new CSSStyleSheet();
let style_registry: jsonObject = {};

const wrapper = (fn: Function, deps: Array<string>, props: any) => () => instantiate(fn, deps, props);

const getComputedCss = (csspath: string = "") => {
	let sheet: any = new CSSStyleSheet();
	if (csspath) {
		let styles = style_registry[csspath]
			? style_registry[csspath]
			: require("src/" + csspath);
		style_registry[csspath] = styles;
		sheet.replace(styles);
	}
	return [globalStyles, sheet];
};

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<string>,
	isRoot: boolean,
	isTestEnv: boolean
) => {
	if (!isTestEnv) {
		if (isRoot && !isRootNodeSet && options.styleUrl) {
			isRootNodeSet = true;
			const styletag = document.createElement("style");
			let styles = require("src/" + options.styleUrl);
			styletag.innerText = (styles || "").toString();
			globalStyles.replace((styles || "").toString());
			document.getElementsByTagName("head")[0].appendChild(styletag);
		} else if (isRoot && isRootNodeSet) {
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
				this.shadow = isTestEnv ? this : this.attachShadow({ mode: "open" });
				this.shadow.adoptedStyleSheets = !isTestEnv ? getComputedCss(options.styleUrl) : [];
				this._inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
				if (this._inputprop) {
					watch(this, this._inputprop, (newvalue: any, oldvalue: any) => {
						if (oldvalue !== newvalue) {
							if (this[klass] && this[klass][this._inputprop]) {
								this[klass][this._inputprop] = (this as any)[this._inputprop];
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
		}
	);
};

export { registerElement };
