import { isNode } from "browser-or-node";
import { fromEvent, Subscription } from "rxjs";
import { componentRegistry } from "./componentRegistry";
import { render } from "./html";
import { instantiate } from "./instance";
import { DecoratorOptions, jsonObject } from "./types";
import { CSS_SHEET_NOT_SUPPORTED, isUndefined, klass } from "./utils";

const COMPONENT_DATA_ATTR = "data-compid";

const createStyleTag = (content: string) => {
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
	target: Array<any>,
	isRoot: boolean
) => {
	if (!isNode) {
		if (isRoot && !componentRegistry.isRootNodeSet && options.styles) {
			componentRegistry.isRootNodeSet = true;
			createStyleTag(options.styles);
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
			private subscriptions: Subscription = new Subscription();
			componentStyleTag: HTMLStyleElement = null;
			eventListenersMap: jsonObject;

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
						`[${COMPONENT_DATA_ATTR}="${id.toString()}"]`
					);
					this.componentStyleTag = createStyleTag(compiledCSS);
					this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
				}
			}

			connectedCallback() {
				this.emulateComponent();
				const fn = Array.isArray(target) ? target : [target];
				this[klass] = instantiate(fn);
				this[klass]["renderer"] = this.shadow;
				this[klass]["emitEvent"] = this.emitEvent.bind(this);
				this[klass]["update"] = this.update.bind(this);
				this[klass].beforeMount && this[klass].beforeMount();
				this.update();
				this[klass].mount && this[klass].mount();
				this.subscriptions.add(
					fromEvent(window, 'onLanguageChange').subscribe(() => {
						this.update();
					})
				);
			}

			update() {
				render(this.shadow, (this[klass].render.bind(this[klass]))());
			};

			getModel() {
				return this[klass];
			};

			setProps(propsObj: jsonObject) {
				for (const [key, value] of Object.entries(propsObj)) {
					this[klass][key] = value;
				}
				this.update();
			}

			emitEvent(eventName: string, data: jsonObject) {
				const event = new CustomEvent(eventName, {
					detail: data
				});
				this.dispatchEvent(event);
			}

			disconnectedCallback() {
				this.subscriptions.unsubscribe();
				this.componentStyleTag && this.componentStyleTag.remove();
				this[klass].unmount && this[klass].unmount();
				if (this.eventListenersMap) {
					for (const [key, value] of Object.entries(this.eventListenersMap)) {
						this.removeEventListener(key, value);
					}
				}
				this.eventListenersMap = null;
			}
		}
	);
};

export { registerElement };

