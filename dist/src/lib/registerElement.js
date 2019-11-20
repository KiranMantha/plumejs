"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var lighterhtml_plus_1 = require("lighterhtml-plus");
var watch_min_js_1 = require("melanke-watchjs/src/watch.min.js");
var instance_1 = require("./instance");
var augmentor_1 = tslib_1.__importDefault(require("augmentor"));
var translationService_1 = require("./translationService");
var getValue = function (obj, key) {
    return obj[key] || null;
};
var isRootNodeSet = false;
var globalStyles = new CSSStyleSheet();
var style_registry = {};
var getComputedCss = function (csspath) {
    if (csspath === void 0) { csspath = ""; }
    var sheet = new CSSStyleSheet();
    if (csspath) {
        var styles = style_registry[csspath]
            ? style_registry[csspath]
            : require("src/" + csspath);
        style_registry[csspath] = styles;
        sheet.replace(styles);
    }
    return [globalStyles, sheet];
};
var registerElement = function (options, target, providers, isRoot, addModelToNode) {
    if (addModelToNode === void 0) { addModelToNode = false; }
    if (isRoot && !isRootNodeSet && options.styleUrl) {
        isRootNodeSet = true;
        var styletag = document.createElement("style");
        var styles = require("src/" + options.styleUrl);
        styletag.innerText = (styles || "").toString();
        globalStyles.replace((styles || "").toString());
        document.getElementsByTagName("head")[0].appendChild(styletag);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error("Cannot register duplicate root component in " +
            options.selector +
            " component");
    }
    window.customElements.define(options.selector, (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.update = function () {
                _this.init();
            };
            _this.shadow = (addModelToNode || options.useShadow === false) ? _this : _this.attachShadow({ mode: "open" });
            _this.shadow.adoptedStyleSheets = getComputedCss(options.styleUrl);
            _this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (_this._inputprop) {
                watch_min_js_1.watch(_this, _this._inputprop, function (prop, action, newvalue, oldvalue) {
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
        class_1.prototype.connectedCallback = function () {
            this[utils_1.klass] = instance_1.instantiate(target, providers, getValue(this, this._inputprop) || {});
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.push(this);
        };
        class_1.prototype.getModel = function () {
            return this[utils_1.klass];
        };
        class_1.prototype.disconnectedCallback = function () {
            this._inputprop && watch_min_js_1.unwatch(this, this._inputprop);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        };
        return class_1;
    }(HTMLElement)));
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQW9EO0FBQ3BELHFEQUEwQztBQUMxQyxpRUFBa0U7QUFDbEUsdUNBQXlDO0FBRXpDLGdFQUFrQztBQUNsQywyREFBa0U7QUFFbEUsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFRLEVBQUUsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLElBQUksWUFBWSxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxjQUFjLEdBQVEsRUFBRSxDQUFDO0FBRTdCLElBQU0sY0FBYyxHQUFHLFVBQUMsT0FBb0I7SUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtJQUMzQyxJQUFJLEtBQUssR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLElBQUksT0FBTyxFQUFFO1FBQ1osSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUN6QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQztRQUM3QixjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEI7SUFDRCxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGLElBQU0sZUFBZSxHQUFHLFVBQ3ZCLE9BQXlCLEVBQ3pCLE1BQWdCLEVBQ2hCLFNBQXdCLEVBQ3hCLE1BQWUsRUFDZixjQUErQjtJQUEvQiwrQkFBQSxFQUFBLHNC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