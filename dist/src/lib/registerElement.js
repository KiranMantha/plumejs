"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const augmentor_1 = require("augmentor");
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
const registerElement = (options, target, providers, isRoot, isUnitTestEnv = false) => {
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
            this.getModel = () => {
                return this[utils_1.klass];
            };
            this.shadow = (isUnitTestEnv || options.useShadow === false) ? this : this.attachShadow({ mode: "open" });
            this.shadow.adoptedStyleSheets = getComputedCss(options.styleUrl);
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (newvalue, oldvalue) => {
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
        init() {
            let _returnfn = this[utils_1.klass].render.bind(this[utils_1.klass]);
            return lighterhtml_1.render.bind(this[utils_1.klass], this.shadow, _returnfn)();
        }
        wrapper() {
            return instance_1.instantiate(target, providers, getValue(this, this._inputprop) || {});
        }
        connectedCallback() {
            this[utils_1.klass] = augmentor_1.augmentor(this.wrapper.bind(this))();
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.push(this);
        }
        disconnectedCallback() {
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMseUNBQXNDO0FBQ3RDLDZEQUFrRTtBQUVsRSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQWUsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUNqRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLElBQUksWUFBWSxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxjQUFjLEdBQWUsRUFBRSxDQUFDO0FBRXBDLE1BQU0sY0FBYyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFLEVBQUU7SUFDL0MsSUFBSSxLQUFLLEdBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztJQUNyQyxJQUFJLE9BQU8sRUFBRTtRQUNaLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDbkMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDekIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDN0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxDQUN2QixPQUF5QixFQUN6QixNQUFnQixFQUNoQixTQUF3QixFQUN4QixNQUFlLEVBQ2YsZ0JBQXlCLEtBQUssRUFDN0IsRUFBRTtJ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