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
const getComputedCss = (useShadow, csspath = "") => {
    let csoArray = [];
    if (useShadow) {
        let defaultStyles = new CSSStyleSheet();
        defaultStyles.insertRule(`:host { display: block; }`);
        csoArray = [globalStyles, defaultStyles];
        if (csspath) {
            let sheet = new CSSStyleSheet();
            let styles = getCss(csspath);
            styles ? sheet.replace(styles) : sheet.replace(csspath);
            csoArray.push(sheet);
        }
    }
    return csoArray;
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
                options.useShadow = true;
                this.shadow = this.attachShadow({ mode: "open" });
            }
            this.shadow.adoptedStyleSheets = browser_or_node_1.isNode ? [] : getComputedCss(options.useShadow, options.styleUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkVBQTBFO0FBQzFFLHlDQUFzQztBQUN0Qyx5REFBOEM7QUFDOUMscURBQXlDO0FBRXpDLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixJQUFJLFlBQVksR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXBELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUNsQyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RSxDQUFDLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRyxDQUFDLFNBQWtCLEVBQUUsVUFBa0IsRUFBRSxFQUFFLEVBQUU7SUFDbkUsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUcsU0FBUyxFQUFFO1FBQ2IsSUFBSSxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUN4QyxhQUFhLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDdEQsUUFBUSxHQUFHLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxF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