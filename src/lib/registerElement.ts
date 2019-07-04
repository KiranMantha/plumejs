import { klass } from './utils';
import { render, html } from "lighterhtml-plus";
import WatchJS from 'melanke-watchjs';
const { watch, unwatch } = WatchJS;
import { instantiate } from "./instance";

const registerElement = (options: DecoratorOptions, target: Function, providers:Array<any> = []) => {
	window.customElements.define(
		options.name,
		class extends HTMLElement {
			render: any;
			[klass]: any;
			private shadow: any;
			_propindex:string = '';
			props:any;
			constructor() {
				super();
				this.shadow = this.attachShadow({ mode: "closed" });
				watch(this, 'props', (prop: any, action: any, newvalue: any, oldvalue: any) => {
					if (oldvalue !== newvalue) {
						if (this[klass] && this[klass]['props']) {
              this[klass]['props'] = this['props'];
              this.update();
            }
					}
				});
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
				this[klass] = instantiate(target, providers, this['props']);
				this[klass]['element'] = this.shadow;
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
				unwatch(this, 'props')
				this[klass].unmount && this[klass].unmount();
			}
		}
	);
};

export { registerElement }; 