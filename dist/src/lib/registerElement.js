"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerElement = void 0;
const browser_or_node_1 = require("browser-or-node");
const rxjs_1 = require("rxjs");
const componentRegistry_1 = require("./componentRegistry");
const html_1 = require("./html");
const instance_1 = require("./instance");
const types_1 = require("./types");
const utils_1 = require("./utils");
const COMPONENT_DATA_ATTR = 'data-compid';
const DEFAULT_COMPONENT_OPTIONS = {
    selector: '',
    root: false,
    styles: ''
};
const createStyleTag = (content, where = null) => {
    const tag = document.createElement('style');
    tag.innerHTML = content;
    where && where.appendChild(tag);
    return tag;
};
const transformCSS = (styles, selector) => {
    if (styles) {
        styles = selector + ' ' + styles.toString().replace('}', ` } ${selector} `);
    }
    return styles;
};
const registerElement = (options, target, dependencies) => {
    options = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
    options.styles = options.styles.toString();
    if (!browser_or_node_1.isNode) {
        if (options.root && !componentRegistry_1.componentRegistry.isRootNodeSet) {
            componentRegistry_1.componentRegistry.isRootNodeSet = true;
            if (options.styles) {
                createStyleTag(options.styles, document.head);
                componentRegistry_1.componentRegistry.globalStyles.replace(options.styles);
            }
        }
        else if (options.root && componentRegistry_1.componentRegistry.isRootNodeSet) {
            throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
        }
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        #klass;
        #shadow;
        #subscriptions = new rxjs_1.Subscription();
        #componentStyleTag = null;
        subscriptions;
        constructor() {
            super();
            this.#shadow = this.attachShadow({ mode: 'open' });
            if (!utils_1.CSS_SHEET_NOT_SUPPORTED) {
                const adoptedStyleSheets = browser_or_node_1.isNode ? [] : componentRegistry_1.componentRegistry.getComputedCss(options.styles);
                this.#shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            this.update = this.update.bind(this);
            this.emitEvent = this.emitEvent.bind(this);
            this.setProps = this.setProps.bind(this);
            this.getInstance = this.getInstance.bind(this);
        }
        emulateComponent() {
            if (utils_1.CSS_SHEET_NOT_SUPPORTED && options.styles) {
                const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
                const compiledCSS = transformCSS(options.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
                this.#componentStyleTag = createStyleTag(compiledCSS);
                this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            const rendererInstance = new types_1.Renderer();
            rendererInstance.update = this.update;
            rendererInstance.shadowRoot = this.#shadow;
            rendererInstance.emitEvent = this.emitEvent;
            this.#klass = (0, instance_1.instantiate)(target, dependencies, rendererInstance);
            this.#klass.beforeMount && this.#klass.beforeMount();
            this.update();
            this.#klass.mount && this.#klass.mount();
            this.#subscriptions.add((0, rxjs_1.fromEvent)(window, 'onLanguageChange').subscribe(() => {
                this.update();
            }));
        }
        update() {
            (0, html_1.render)(this.#shadow, this.#klass.render.bind(this.#klass)());
            if (utils_1.CSS_SHEET_NOT_SUPPORTED) {
                options.styles && this.#shadow.insertBefore(this.#componentStyleTag, this.#shadow.childNodes[0]);
                componentRegistry_1.componentRegistry.globalStyleTag &&
                    this.#shadow.insertBefore(document.importNode(componentRegistry_1.componentRegistry.globalStyleTag, true), this.#shadow.childNodes[0]);
            }
        }
        emitEvent(eventName, data, isBubbling = true) {
            const event = new CustomEvent(eventName, {
                detail: data,
                bubbles: isBubbling
            });
            this.dispatchEvent(event);
        }
        setProps(propsObj) {
            for (const [key, value] of Object.entries(propsObj)) {
                this.#klass[key] = value;
            }
            this.#klass.onPropsChanged && this.#klass.onPropsChanged();
            this.update();
        }
        getInstance() {
            return this.#klass;
        }
        disconnectedCallback() {
            this.#subscriptions.unsubscribe();
            this.#componentStyleTag && this.#componentStyleTag.remove();
            this.#klass.unmount && this.#klass.unmount();
            if (this.subscriptions?.length) {
                for (const unsubscribe of this.subscriptions) {
                    unsubscribe();
                }
            }
        }
    });
};
exports.registerElement = registerElement;
