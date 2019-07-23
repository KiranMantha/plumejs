"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var lighterhtml_plus_1 = require("lighterhtml-plus");
var melanke_watchjs_1 = require("melanke-watchjs");
var instance_1 = require("./instance");
var augmentor_1 = tslib_1.__importDefault(require("augmentor"));
var getValue = function (obj, key) {
    return obj[key] || null;
};
var registerElement = function (options, target, providers) {
    if (providers === void 0) { providers = []; }
    window.customElements.define(options.selector, (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "closed" });
            _this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (_this._inputprop) {
                melanke_watchjs_1.watch(_this, _this._inputprop, function (prop, action, newvalue, oldvalue) {
                    if (oldvalue !== newvalue) {
                        if (_this[utils_1.klass] && _this[utils_1.klass][_this._inputprop]) {
                            _this[utils_1.klass][_this._inputprop] = getValue(_this, _this._inputprop);
                            _this.update();
                        }
                    }
                });
            }
            return _this;
        }
        Object.defineProperty(class_1.prototype, "__id", {
            get: function () {
                return this.dataset.hash;
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.renderTemplate = function () {
            return augmentor_1.default(this.render.bind(this))();
        };
        class_1.prototype.init = function () {
            return lighterhtml_plus_1.render.bind(this[utils_1.klass], this.shadow, this.renderTemplate)();
        };
        class_1.prototype.attributeChangedCallback = function () {
            this.update();
        };
        class_1.prototype.connectedCallback = function () {
            this[utils_1.klass] = instance_1.instantiate(target, providers, getValue(this, this._inputprop) || {});
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.update();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            Object.seal(this);
            Object.seal(this[utils_1.klass]);
        };
        class_1.prototype.update = function () {
            this.init();
        };
        class_1.prototype.disconnectedCallback = function () {
            melanke_watchjs_1.unwatch(this, "props");
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        };
        return class_1;
    }(HTMLElement)));
};
exports.registerElement = registerElement;
//# sourceMappingURL=registerElement.js.map