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
const translationService_1 = require("./translationService");
const getValue = (obj, key) => {
    return obj[key] || null;
};
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = {};
const getComputedCss = (csspath = "") => {
    let sheet = new CSSStyleSheet();
    if (csspath) {
        let styles = style_registry[csspath]
            ? style_registry[csspath]
            : require("src/" + csspath);
        style_registry[csspath] = styles;
        sheet.replace(styles);
    }
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers, isRoot, addModelToNode = false) => {
    if (isRoot && !isRootNodeSet && options.styleUrl) {
        isRootNodeSet = true;
        const styletag = document.createElement("style");
        let styles = require("src/" + options.styleUrl);
        styletag.innerText = (styles || "").toString();
        globalStyles.replace((styles || "").toString());
        document.getElementsByTagName("head")[0].appendChild(styletag);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error("Cannot register duplicate root component in " +
            options.selector +
            " component");
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.update = () => {
                this.init();
            };
            this.shadow = (addModelToNode || options.useShadow === false) ? this : this.attachShadow({ mode: "open" });
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
            return this;
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
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.push(this);
        }
        getModel() {
            return this[utils_1.klass];
        }
        disconnectedCallback() {
            this._inputprop && watch_min_js_1.unwatch(this, this._inputprop);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtQ0FBb0Q7QUFDcEQsdURBQTBDO0FBQzFDLG1FQUFrRTtBQUNsRSx5Q0FBeUM7QUFFekMsMERBQWtDO0FBQ2xDLDZEQUFrRTtBQUVsRSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUMxQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLElBQUksWUFBWSxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxjQUFjLEdBQVEsRUFBRSxDQUFDO0FBRTdCLE1BQU0sY0FBYyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFLEVBQUU7SUFDL0MsSUFBSSxLQUFLLEdBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNyQyxJQUFJLE9BQU8sRUFBRTtRQUNaLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDbkMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDekIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDN0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxDQUN2QixPQUF5QixFQUN6QixNQUFnQixFQUNoQixTQUF3QixFQUN4QixNQUFlLEVBQ2YsaUJBQTBCLEtBQUssRUFDOUIsRUFB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