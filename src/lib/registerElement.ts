import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml-plus";
import { watch, unwatch } from "melanke-watchjs";
import { instantiate } from "./instance";
import { DecoratorOptions } from "./types";

const getValue = (obj:any, key:string) => {
	return obj[key] || null;
}

const registerElement = (
	options: DecoratorOptions,
	target: Function,
	providers: Array<any> = []
) => {
	window.customElements.define(
		options.selector,
		class extends HTMLElement {
			render: any;
			[klass]: any;
			private shadow: any;
			_inputprop: string;
			constructor() {
				super();
				this.shadow = this.attachShadow({ mode: "closed" });
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

			get __id() {
				return this.dataset.hash;
			}

			renderTemplate() {
				return this.render();
			}

			private init() {
				return render.bind(this[klass], this.shadow, this.renderTemplate)();
			}

			attributeChangedCallback() {
				this.update();
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
				unwatch(this, "props");
				this[klass].unmount && this[klass].unmount();
			}
		}
	);
};

export { registerElement };
