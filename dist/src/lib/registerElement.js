"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_plus_1 = require("lighterhtml-plus");
const watch_min_js_1 = require("melanke-watchjs/src/watch.min.js");
const instance_1 = require("./instance");
const augmentor_1 = __importDefault(require("augmentor"));
const getValue = (obj, key) => {
    return obj[key] || null;
};
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = {};
const getComputedCss = (csspath = '') => {
    let sheet = new CSSStyleSheet();
    let styles = style_registry[csspath] ? style_registry[csspath] : require('src/' + csspath);
    style_registry[csspath] = styles;
    sheet.replace(styles);
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers = [], isRoot) => {
    if (isRoot && !isRootNodeSet) {
        isRootNodeSet = true;
        const styletag = document.createElement('style');
        let styles = require('src/' + options.styleUrl);
        styletag.innerText = (styles || '').toString();
        globalStyles.replace((styles || '').toString());
        document.getElementsByTagName('head')[0].appendChild(styletag);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            this.shadow.adoptedStyleSheets = getComputedCss(options.styleUrl);
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watch_min_js_1.watch(this, this._inputprop, (prop, action, newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = getValue(this, this._inputprop);
                            this.update();
                        }
                    }
                });
            }
        }
        renderTemplate() {
            return augmentor_1.default(this.render.bind(this))();
        }
        init() {
            return lighterhtml_plus_1.render.bind(this[utils_1.klass], this.shadow, this.renderTemplate)();
        }
        connectedCallback() {
            this[utils_1.klass] = instance_1.instantiate(target, providers, getValue(this, this._inputprop) || {});
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.update();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            Object.seal(this);
            Object.seal(this[utils_1.klass]);
        }
        update() {
            this.init();
        }
        disconnectedCallback() {
            this._inputprop && watch_min_js_1.unwatch(this, this._inputprop);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=registerElement.js.map