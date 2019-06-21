//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
import { _id, klass, _nextId, isArray } from "./lib/utils";
import { registerService } from "./lib/service_resolver";
import { instantiate } from "./lib/instance";
import { render, html } from "lighterhtml-plus";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

interface IDecoratorOptions {
	name: string;
	providers?: Array<string>;
}

interface IWebComponent {
	mount?: () => void;
	unmount?: () => void;
	render: () => void;
	beforeMount?: () => void;
}

const Component = (options: IDecoratorOptions) => {
	return (target: Function) => {
		if (options.name.indexOf("-") <= 0) {
			throw new Error("You need at least 1 dash in the custom element name!");
		}
		if (options.providers) {
			if (!isArray(options.providers))
				throw "ServiceMetaData.providers must be an array";
		} else {
			options.providers = [];
		}
		registerElement(options, target);
	};
};

const Service = (options: IDecoratorOptions) => {
	return (target: Function) => {
		if (options.providers) {
			if (!isArray(options.providers))
				throw Error("ServiceMetaData.providers must be an array");
		} else {
			options.providers = [];
		}
		registerService(options.name, target, options.providers);
	};
};

const registerElement = (options: IDecoratorOptions, target: Function) => {
	window.customElements.define(
		options.name,
		class extends HTMLElement {
			render:any;
			data:any;
      private shadow:any;
      [klass]:any;
			constructor() {
				super();
				this.shadow = this.attachShadow({ mode: "closed" });
      }

      [_id](){
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
				this[klass] = instantiate<typeof target>(target, options.providers, this.data);
				delete this.data;
				this[klass].beforeMount && this[klass].beforeMount();
				this.update();
				this[klass]["update"] = this.update.bind(this);
				this[klass].mount && this[klass].mount();
			}

			update() {
				this.init();
			}

			disconnectedCallback() {
				this[klass].unmount && this[klass].unmount();
			}
		}
	);
};

export { Component, Service, html, IWebComponent };
