"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerElement = void 0;
const componentRegistry_1 = require("./componentRegistry");
const html_1 = require("./html");
const instance_1 = require("./instance");
const types_1 = require("./types");
const utils_1 = require("./utils");
const COMPONENT_DATA_ATTR = 'data-compid';
const DEFAULT_COMPONENT_OPTIONS = {
    selector: '',
    root: false,
    styles: '',
    deps: [],
    standalone: false
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
const registerElement = (options, target) => {
    options = Object.assign(Object.assign({}, DEFAULT_COMPONENT_OPTIONS), options);
    options.styles = options.styles.toString();
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
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.componentStyleTag = null;
            this.eventSubscriptions = [];
            this.shadow = this.attachShadow({ mode: 'open' });
            if (!utils_1.CSS_SHEET_NOT_SUPPORTED) {
                const adoptedStyleSheets = componentRegistry_1.componentRegistry.getComputedCss(options.styles, options.standalone);
                this.shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            this.getInstance = this.getInstance.bind(this);
        }
        emulateComponent() {
            if (utils_1.CSS_SHEET_NOT_SUPPORTED && options.styles) {
                const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
                const compiledCSS = transformCSS(options.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
                this.componentStyleTag = createStyleTag(compiledCSS);
                this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            const rendererInstance = new types_1.Renderer();
            rendererInstance.update = () => {
                this.update();
            };
            rendererInstance.shadowRoot = this.shadow;
            rendererInstance.emitEvent = (eventName, data) => {
                this.emitEvent(eventName, data);
            };
            this.klass = (0, instance_1.instantiate)(target, options.deps, rendererInstance);
            this.klass.beforeMount && this.klass.beforeMount();
            this.update();
            this.klass.mount && this.klass.mount();
            this.emitEvent('bindprops', {
                setProps: (propsObj) => {
                    this.setProps(propsObj);
                }
            }, false);
            this.eventSubscriptions.push((0, utils_1.fromVanillaEvent)(window, 'onLanguageChange', () => {
                this.update();
            }));
        }
        update() {
            (0, html_1.render)(this.shadow, (() => this.klass.render())());
            if (utils_1.CSS_SHEET_NOT_SUPPORTED) {
                options.styles && this.shadow.insertBefore(this.componentStyleTag, this.shadow.childNodes[0]);
                componentRegistry_1.componentRegistry.globalStyleTag &&
                    this.shadow.insertBefore(document.importNode(componentRegistry_1.componentRegistry.globalStyleTag, true), this.shadow.childNodes[0]);
            }
        }
        emitEvent(eventName, data, allowBubbling = true) {
            const event = new CustomEvent(eventName, {
                detail: data,
                bubbles: allowBubbling
            });
            this.dispatchEvent(event);
        }
        setProps(propsObj) {
            for (const [key, value] of Object.entries(propsObj)) {
                this.klass[key] = value;
            }
            this.klass.onPropsChanged && this.klass.onPropsChanged();
            this.update();
        }
        getInstance() {
            return this.klass;
        }
        disconnectedCallback() {
            var _a;
            this.componentStyleTag && this.componentStyleTag.remove();
            this.klass.unmount && this.klass.unmount();
            if ((_a = this.eventSubscriptions) === null || _a === void 0 ? void 0 : _a.length) {
                for (const unsubscribe of this.eventSubscriptions) {
                    unsubscribe();
                }
            }
        }
    });
};
exports.registerElement = registerElement;
