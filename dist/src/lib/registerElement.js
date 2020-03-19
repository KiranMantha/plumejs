"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const internalTranslationService_1 = require("./internalTranslationService");
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
            if (browser_or_node_1.isNode) {
                this.shadow = this;
            }
            else if (options.useShadow !== undefined) {
                this.shadow = !!options.useShadow === false ? this : this.attachShadow({ mode: "open" });
            }
            else {
                this.shadow = this.attachShadow({ mode: "open" });
            }
            this.shadow.adoptedStyleSheets = browser_or_node_1.isNode ? [] : getComputedCss(options.styleUrl);
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (newvalue, oldvalue) => {
                    let joldval = JSON.stringify(oldvalue);
                    let jnewval = JSON.stringify(newvalue);
                    if (joldval !== jnewval) {
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
            internalTranslationService_1.InternalTranslationService.translationComponents.set(this, options.selector);
        }
        disconnectedCallback() {
            internalTranslationService_1.InternalTranslationService.translationComponents.delete(this);
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkVBQTBFO0FBQzFFLHlDQUFzQztBQUN0Qyx5REFBOEM7QUFDOUMscURBQXlDO0FBRXpDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixJQUFJLFlBQVksR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXBELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUNsQyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEVBQUU7UUFDWixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxDQUN2QixPQUF5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