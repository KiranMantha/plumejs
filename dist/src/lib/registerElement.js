"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const translationService_1 = require("./translationService");
const augmentor_1 = require("augmentor");
const service_resolver_1 = require("./service_resolver");
const browser_or_node_1 = require("browser-or-node");
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = new Map();
const wrapper = (fn, deps, props) => () => instance_1.instantiate(fn, deps, props);
const getCss = (csspath) => {
    return style_registry.has(csspath) ? style_registry.get(csspath) : '';
};
const getComputedCss = (csspath = "") => {
    let sheet = new CSSStyleSheet();
    if (csspath) {
        sheet.replace(getCss(csspath));
    }
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers, isRoot) => {
    if (!browser_or_node_1.isNode) {
        if (isRoot && !isRootNodeSet && options.styleUrl) {
            style_registry = service_resolver_1.Injector.get('COMPILEDCSS');
            isRootNodeSet = true;
            const styletag = document.createElement("style");
            let styles = getCss(options.styleUrl);
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
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.update = () => {
                this.init();
            };
            this.getModel = () => {
                return this[utils_1.klass];
            };
            this.shadow = browser_or_node_1.isNode ? this : this.attachShadow({ mode: "open" });
            this.shadow.adoptedStyleSheets = browser_or_node_1.isNode ? [] : getComputedCss(options.styleUrl);
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = this[this._inputprop];
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
        connectedCallback() {
            this[utils_1.klass] = augmentor_1.augmentor(wrapper(target, providers, this[this._inputprop]))();
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.set(this, options.selector);
        }
        disconnectedCallback() {
            translationService_1.InternalTranslationService.translationComponents.delete(this);
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkRBQWtFO0FBQ2xFLHlDQUFzQztBQUN0Qyx5REFBOEM7QUFDOUMscURBQXlDO0FBRXpDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixJQUFJLFlBQVksR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXBELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFjLEVBQUUsRUFBRTtJQUNqQyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEVBQUU7UUFDWixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxDQUN2QixPQUF5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