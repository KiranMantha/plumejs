"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const internalTranslationService_1 = require("./internalTranslationService");
const augmentor_1 = require("augmentor");
const browser_or_node_1 = require("browser-or-node");
const componentRegistry_1 = require("./componentRegistry");
const wrapper = (fn, deps, props) => () => instance_1.instantiate(fn, deps, props);
const createSTyleTag = (content) => {
    let tag = document.createElement('style');
    tag.innerHTML = content;
    document.head.appendChild(tag);
    return tag;
};
const transformCSS = (styles, selector) => {
    if (styles) {
        styles = selector + ' ' + styles.toString().replace('}', ` } ${selector} `);
    }
    return styles;
};
const registerElement = (options, target, providers, isRoot) => {
    if (!browser_or_node_1.isNode) {
        if (isRoot && !componentRegistry_1.componentRegistry.isRootNodeSet && options.styles) {
            componentRegistry_1.componentRegistry.isRootNodeSet = true;
            createSTyleTag(options.styles);
            componentRegistry_1.componentRegistry.globalStyles.replace((options.styles || "").toString());
        }
        else if (isRoot && componentRegistry_1.componentRegistry.isRootNodeSet) {
            throw Error("Cannot register duplicate root component in " +
                options.selector +
                " component");
        }
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.componentStyleTag = null;
            this.update = () => {
                this.init();
            };
            this.getModel = () => {
                return this[utils_1.klass];
            };
            let adoptedStyleSheets = [];
            options.useShadow = utils_1.isUndefined(options.useShadow) ? true : options.useShadow;
            if (!utils_1.CSS_SHEET_NOT_SUPPORTED) {
                adoptedStyleSheets = browser_or_node_1.isNode ? [] : componentRegistry_1.componentRegistry.getComputedCss(options.useShadow, options.styles);
                if (browser_or_node_1.isNode) {
                    this.shadow = this;
                }
                else {
                    this.shadow = options.useShadow ? this.attachShadow({ mode: "open" }) : this;
                }
                this.shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            else {
                options.useShadow = false;
                this.shadow = this;
            }
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (oldvalue, newvalue) => {
                    let joldval = JSON.stringify(oldvalue);
                    let jnewval = JSON.stringify(newvalue);
                    if (joldval !== jnewval) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = this[this._inputprop];
                            this[utils_1.klass].inputChanged && this[utils_1.klass].inputChanged(oldvalue, newvalue);
                            this.update();
                        }
                    }
                });
            }
        }
        init() {
            let _returnfn = this[utils_1.klass].render.bind(this[utils_1.klass]);
            lighterhtml_1.render.bind(this[utils_1.klass], this.shadow, _returnfn)();
        }
        emulateComponent() {
            if (!browser_or_node_1.isNode && utils_1.CSS_SHEET_NOT_SUPPORTED && options.styles && !options.root) {
                let id = new Date().getTime() + Math.floor((Math.random() * 1000) + 1);
                let compiledCSS = transformCSS(options.styles, `[data-cid="${id.toString()}"]`);
                this.componentStyleTag = createSTyleTag(compiledCSS);
                this.setAttribute('data-cid', id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            this[utils_1.klass] = augmentor_1.augmentor(wrapper(target, providers, this[this._inputprop]))();
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            internalTranslationService_1.InternalTranslationService.translationComponents.set(this, options.selector);
        }
        disconnectedCallback() {
            this.componentStyleTag && this.componentStyleTag.remove();
            internalTranslationService_1.InternalTranslationService.translationComponents.delete(this);
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
