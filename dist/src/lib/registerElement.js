import * as tslib_1 from "tslib";
import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml-plus";
import { watch, unwatch } from "melanke-watchjs/src/watch.min.js";
import { instantiate } from "./instance";
import augmentor from 'augmentor';
var getValue = function (obj, key) {
    return obj[key] || null;
};
var isRootNodeSet = false;
var globalStyles = new CSSStyleSheet();
var style_registry = {};
var getComputedCss = function (csspath) {
    if (csspath === void 0) { csspath = ''; }
    var sheet = new CSSStyleSheet();
    if (csspath) {
        var styles = style_registry[csspath] ? style_registry[csspath] : require('src/' + csspath);
        style_registry[csspath] = styles;
        sheet.replace(styles);
    }
    return [globalStyles, sheet];
};
var registerElement = function (options, target, providers, isRoot, addModelToNode) {
    if (addModelToNode === void 0) { addModelToNode = false; }
    if (isRoot && !isRootNodeSet && options.styleUrl) {
        isRootNodeSet = true;
        var styletag = document.createElement('style');
        var styles = require('src/' + options.styleUrl);
        styletag.innerText = (styles || '').toString();
        globalStyles.replace((styles || '').toString());
        document.getElementsByTagName('head')[0].appendChild(styletag);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
    window.customElements.define(options.selector, (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.shadow = _this;
            _this.shadow.adoptedStyleSheets = getComputedCss(options.styleUrl);
            _this._inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
            if (_this._inputprop) {
                watch(_this, _this._inputprop, function (prop, action, newvalue, oldvalue) {
                    if (oldvalue !== newvalue) {
                        if (_this[klass] && _this[klass][_this._inputprop]) {
                            _this[klass][_this._inputprop] = getValue(_this, _this._inputprop);
                            _this.update();
                        }
                    }
                });
            }
            return _this;
        }
        class_1.prototype.renderTemplate = function () {
            return augmentor(this.render.bind(this))();
        };
        class_1.prototype.init = function () {
            return render.bind(this[klass], this.shadow, this.renderTemplate)();
        };
        class_1.prototype.connectedCallback = function () {
            this[klass] = instantiate(target, providers, getValue(this, this._inputprop) || {});
            this[klass]["element"] = this.shadow;
            this[klass].beforeMount && this[klass].beforeMount();
            this.update();
            this[klass]["update"] = this.update.bind(this);
            this[klass].mount && this[klass].mount();
            Object.seal(this);
            Object.seal(this[klass]);
        };
        class_1.prototype.update = function () {
            this.init();
        };
        class_1.prototype.getModel = function () {
            return addModelToNode ? this[klass] : null;
        };
        class_1.prototype.disconnectedCallback = function () {
            this._inputprop && unwatch(this, this._inputprop);
            this[klass].unmount && this[klass].unmount();
        };
        return class_1;
    }(HTMLElement)));
};
export { registerElement };
//# sourceMappingURL=registerElement.js.map