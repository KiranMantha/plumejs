"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var lighterhtml_plus_1 = require("lighterhtml-plus");
var melanke_watchjs_1 = require("melanke-watchjs");
var instance_1 = require("./instance");
var augmentor_1 = __importDefault(require("augmentor"));
var getValue = function (obj, key) {
    return obj[key] || null;
};
var getComputedCss = function (csspath) {
    if (csspath === void 0) { csspath = ''; }
    var sheet = new CSSStyleSheet();
    sheet.replace(csspath);
    return [globalStyles, sheet];
};
var isRootNodeSet = false;
var globalStyles = new CSSStyleSheet();
var registerElement = function (options, target, providers, isRoot) {
    if (providers === void 0) { providers = []; }
    if (isRoot && !isRootNodeSet) {
        isRootNodeSet = true;
        globalStyles.replace(options.styles);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
    window.customElements.define(options.selector, (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
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
            this.shadow.adoptedStyleSheets = getComputedCss(options.styles);
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