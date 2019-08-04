import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml-plus";
import { watch, unwatch } from "melanke-watchjs";
import { instantiate } from "./instance";
import { DecoratorOptions } from "./types";
import augmentor from 'augmentor';

const getValue = (obj:any, key:string) => {
	return obj[key] || null;
}

const getComputedCss = (csspath: string = '') => {
	let sheet:any = new CSSStyleSheet();	
	sheet.replace(csspath);
	return [globalStyles, sheet];
}

let isRootNodeSet = false;
let globalStyles:any = new CSSStyleSheet();

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<any> = [],
	isRoot: boolean
) => {
	if(isRoot && !isRootNodeSet) {
		isRootNodeSet = true;
		const styletag = document.createElement('style');
		styletag.innerText = (options.styles || '').toString();
		globalStyles.replace((options.styles || '').toString());
		document.getElementsByTagName('head')[0].appendChild(styletag);
	} else if(isRoot && isRootNodeSet) {
		throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
	}

	window.customElements.define(
		options.selector,
		class extends HTMLElement {
			render: any;
			[klass]: any;
			private shadow: any;
			_inputprop: string;
			constructor() {
				super();
				this.shadow = this.attachShadow({ mode: "open" });
				//this.shadow = this;
				this.shadow.adoptedStyleSheets = getComputedCss(options.styles);
				this._inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
				if (this._inputprop) {
					watch(
						this,
						this._inputprop,
						(prop: any, action: any, newvalue: any, oldvalue: any) => {
							if (oldvalue !== newvalue) {
								if (this[klass] && this[klass][this._inputprop]) {
									this[klass][this._inputprop] =  getValue(this, this._inputprop);
									this.update();
								}
							}
						}
					);
				}
			}

			renderTemplate() {
				return augmentor(this.render.bind(this))();
			}

			private init() {
				return render.bind(this[klass], this.shadow, this.renderTemplate)();
			}

			connectedCallback() {				
				this[klass] = instantiate(
					target,
					providers,
					getValue(this, this._inputprop) || {}
				);
				this[klass]["element"] = this.shadow;
				this[klass].beforeMount && this[klass].beforeMount();
				this.update();
				this[klass]["update"] = this.update.bind(this);
				this[klass].mount && this[klass].mount();
				Object.seal(this);
				Object.seal(this[klass]);
			}

			update() {
				this.init();
			}

			disconnectedCallback() {
				this._inputprop && unwatch(this, this._inputprop);
				this[klass].unmount && this[klass].unmount();
			}
		}
	);
};

export { registerElement };
