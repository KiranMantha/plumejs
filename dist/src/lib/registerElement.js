"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var lighterhtml_1 = require("lighterhtml");
var watchObject_1 = require("./watchObject");
var instance_1 = require("./instance");
var translationService_1 = require("./translationService");
var augmentor_1 = require("augmentor");
var service_resolver_1 = require("./service_resolver");
var browser_or_node_1 = require("browser-or-node");
var isRootNodeSet = false;
var globalStyles = new CSSStyleSheet();
var style_registry = new Map();
var wrapper = function (fn, deps, props) { return function () { return instance_1.instantiate(fn, deps, props); }; };
var getCss = function (csspath) {
    return style_registry.has(csspath) ? style_registry.get(csspath) : '';
};
var getComputedCss = function (csspath) {
    if (csspath === void 0) { csspath = ""; }
    var sheet = new CSSStyleSheet();
    if (csspath) {
        sheet.replace(getCss(csspath));
    }
    return [globalStyles, sheet];
};
var registerElement = function (options, target, providers, isRoot) {
    if (!browser_or_node_1.isNode) {
        if (isRoot && !isRootNodeSet && options.styleUrl) {
            style_registry = service_resolver_1.Injector.get('COMPILEDCSS');
            isRootNodeSet = true;
            var styletag = document.createElement("style");
            var styles = getCss(options.styleUrl);
            styletag.innerText = (styles || "").toString();
            globalStyles.replace((styles || "").toString());
            document.getElementsByTagName("head")[0].appendChild(styletag);
        }
        else if (isRoot && isRootNodeSet) {
            throw Error("Cannot register duplicate root component in " +
                options.selector +
                " component");
        }
    }
    window.customElements.define(options.selector, /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var _this = _super.call(this) || this;
            _this.update = function () {
                _this.init();
            };
            _this.getModel = function () {
                return _this[utils_1.klass];
            };
            _this.shadow = browser_or_node_1.isNode ? _this : _this.attachShadow({ mode: "open" });
            _this.shadow.adoptedStyleSheets = browser_or_node_1.isNode ? [] : getComputedCss(options.styleUrl);
            _this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (_this._inputprop) {
                watchObject_1.watch(_this, _this._inputprop, function (newvalue, oldvalue) {
                    if (oldvalue !== newvalue) {
                        if (_this[utils_1.klass] && _this[utils_1.klass][_this._inputprop]) {
                            _this[utils_1.klass][_this._inputprop] = _this[_this._inputprop];
                            _this.update();
                        }
                    }
                });
            }
            return _this;
        }
        class_1.prototype.init = function () {
            var _returnfn = this[utils_1.klass].render.bind(this[utils_1.klass]);
            lighterhtml_1.render.bind(this[utils_1.klass], this.shadow, _returnfn)();
        };
        class_1.prototype.connectedCallback = function () {
            this[utils_1.klass] = augmentor_1.augmentor(wrapper(target, providers, this[this._inputprop]))();
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.set(this, options.selector);
        };
        class_1.prototype.disconnectedCallback = function () {
            translationService_1.InternalTranslationService.translationComponents.delete(this);
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        };
        return class_1;
    }(HTMLElement)));
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQW9EO0FBQ3BELDJDQUFxQztBQUNyQyw2Q0FBK0M7QUFDL0MsdUNBQXlDO0FBRXpDLDJEQUFrRTtBQUNsRSx1Q0FBc0M7QUFDdEMsdURBQThDO0FBQzlDLG1EQUF5QztBQUV6QyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDMUIsSUFBSSxZQUFZLEdBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUM1QyxJQUFJLGNBQWMsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVwRCxJQUFNLE9BQU8sR0FBRyxVQUFDLEVBQVksRUFBRSxJQUFtQixFQUFFLEtBQVUsSUFBSyxPQUFBLGNBQU0sT0FBQSxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQTVCLENBQTRCLEVBQWxDLENBQWtDLENBQUM7QUFFdEcsSUFBTSxNQUFNLEdBQUcsVUFBQyxPQUFjO0lBQzdCLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3ZFLENBQUMsQ0FBQTtBQUVELElBQU0sY0FBYyxHQUFHLFVBQUMsT0FBb0I7SUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtJQUMzQyxJQUFJLEtBQUssR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLElBQUksT0FBTyxFQUFFO1FBQ1osS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUNELE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxlQUFlLEdBQUcsVUFDdkIsT0FBeUIsRUFDekIsTUFBZ0IsRUFDaEIsU0FBd0IsRUFDeEIsTUFBZTtJQUVmLElBQUksQ0FBQyx3QkFBTSxFQUFFO1FBQ1osSUFBSSxNQUFNLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNqRCxjQUFjLEdBQUcsMkJBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0MsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksTUFBTSxJQUFJLGFBQWEsRUFBRTtZQUNuQyxNQUFNLEtBQUssQ0FDViw4Q0FBOEM7Z0JBQzdDLE9BQU8sQ0FBQyxRQUFRO2dCQUNoQixZQUFZLENBQ2IsQ0FBQztTQUNGO0tBQ0Q7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDM0IsT0FBTyxDQUFDLFFBQVE7UUFDRixtQ0FBVztRQUt4QjtZQUFBLFlBQ0MsaUJBQU8sU0FjUDtZQWlCRCxZQUFNLEdBQUc7Z0JBQ1IsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBRUYsY0FBUSxHQUFHO2dCQUNWLE9BQU8sS0FBSSxDQUFDLGFBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQXBDRCxLQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsd0JBQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hGLEtBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQywwQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRSxJQUFJLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLG1CQUFLLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQyxRQUFhLEVBQUUsUUFBYTtvQkFDekQsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO3dCQUMxQixJQUFJLEtBQUksQ0FBQyxhQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUNoRCxLQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFJLEtBQVksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlELEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDZDtxQkFDRDtnQkFDRixDQUFDLENBQUMsQ0FBQzthQUNIOztRQUNGLENBQUM7UUFFTyxzQkFBSSxHQUFaO1lBQ0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLENBQUM7WUFDckQsb0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBRUQsbUNBQWlCLEdBQWpCO1lBQ0MsSUFBSSxDQUFDLGFBQUssQ0FBQyxHQUFHLHFCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUcsSUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN0RixJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQyxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekMsK0NBQTBCLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQVVELHNDQUFvQixHQUFwQjtZQUNDLCtDQUEwQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxJQUFJLHFCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUMsQ0FBQztRQUNGLGNBQUM7SUFBRCxDQUFDLEFBbERELENBQWMsV0FBVyxHQW1EekIsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVPLDBDQUFlIn0=