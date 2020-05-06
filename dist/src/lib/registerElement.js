"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const internalTranslationService_1 = require("./internalTranslationService");
const augmentor_1 = require("augmentor");
const browser_or_node_1 = require("browser-or-node");
const componentRegistry_1 = require("./componentRegistry");
const wrapper = (fn, deps, props) => () => instance_1.instantiate(fn, deps, props);
const registerElement = (options, target, providers, isRoot) => {
    if (!browser_or_node_1.isNode) {
        if (isRoot && !componentRegistry_1.componentRegistry.isRootNodeSet && options.styles) {
            componentRegistry_1.componentRegistry.isRootNodeSet = true;
            const styletag = document.createElement("style");
            let styles = options.styles;
            styletag.innerText = (styles || "").toString();
            componentRegistry_1.componentRegistry.globalStyles.replace((styles || "").toString());
            document.getElementsByTagName("head")[0].appendChild(styletag);
        }
        else if (isRoot && componentRegistry_1.componentRegistry.isRootNodeSet) {
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
            this.shadow.adoptedStyleSheets = browser_or_node_1.isNode ? [] : componentRegistry_1.componentRegistry.getComputedCss(options.useShadow, options.styles);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkVBQTBFO0FBQzFFLHlDQUFzQztBQUN0QyxxREFBeUM7QUFDekMsMkRBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxlQUFlLEdBQUcsQ0FDdkIsT0FBeUIsRUFDekIsTUFBZ0IsRUFDaEIsU0FBd0IsRUFDeEIsTUFBZSxFQUNkLEVBQUU7SUFDSCxJQUFJLENBQUMsd0JBQU0sRUFBRTtRQUNaLElBQUksTUFBTSxJQUFJLENBQUUscUNBQWlCLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbEUscUNBQWlCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQyxxQ0FBaUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDbEUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFR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