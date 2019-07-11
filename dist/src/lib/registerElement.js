"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_plus_1 = require("lighterhtml-plus");
const melanke_watchjs_1 = require("melanke-watchjs");
const instance_1 = require("./instance");
const getValue = (obj, key) => {
    return obj[key] || null;
};
const registerElement = (options, target, providers = []) => {
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "closed" });
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                melanke_watchjs_1.watch(this, this._inputprop, (prop, action, newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = getValue(this, this._inputprop);
                            this.update();
                        }
                    }
                });
            }
        }
        get __id() {
            return this.dataset.hash;
        }
        renderTemplate() {
            return this.render();
        }
        init() {
            return lighterhtml_plus_1.render.bind(this[utils_1.klass], this.shadow, this.renderTemplate)();
        }
        attributeChangedCallback() {
            this.update();
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
            melanke_watchjs_1.unwatch(this, "props");
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=registerElement.js.map