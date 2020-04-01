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
    sheet.insertRule(`:host { display: block; }`);
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
                watchObject_1.watch(this, this._inputprop, (oldvalue, newvalue) => {
                    let joldval = JSON.stringify(oldvalue);
                    let jnewval = JSON.stringify(newvalue);
                    if (joldval !== jnewval) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = this[this._inputprop];
                            this[utils_1.klass].inputChanged && this[utils_1.klass].inputChanged(oldvalue, newvalue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkVBQTBFO0FBQzFFLHlDQUFzQztBQUN0Qyx5REFBOEM7QUFDOUMscURBQXlDO0FBRXpDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixJQUFJLFlBQVksR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXBELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUNsQyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEVBQUU7UUFDWixLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsS0FBSyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFD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