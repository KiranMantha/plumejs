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
const createSTyleTag = (content) => {
    let tag = document.createElement('style');
    tag.innerHTML = content;
    document.head.appendChild(tag);
    return tag;
};
const transformCSS = (styles, selector) => {
    if (styles) {
        styles = selector + ' ' + styles.replace('}', `} ${selector}`);
    }
    return styles;
};
let CSS_SHEET_NOT_SUPPORTED = false;
const registerElement = (options, target, providers, isRoot) => {
    if (!browser_or_node_1.isNode) {
        if (isRoot && !componentRegistry_1.componentRegistry.isRootNodeSet && options.styles) {
            componentRegistry_1.componentRegistry.isRootNodeSet = true;
            createSTyleTag(options.styles);
            componentRegistry_1.componentRegistry.globalStyles.replace((options.styles || "").toString());
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
            this.componentStyleTag = null;
            this.update = () => {
                this.init();
            };
            this.getModel = () => {
                return this[utils_1.klass];
            };
            let adoptedStyleSheets = [];
            options.useShadow = utils_1.isUndefined(options.useShadow) ? true : options.useShadow;
            try {
                adoptedStyleSheets = browser_or_node_1.isNode ? [] : componentRegistry_1.componentRegistry.getComputedCss(options.useShadow, options.styles);
                if (browser_or_node_1.isNode) {
                    this.shadow = this;
                }
                else {
                    this.shadow = options.useShadow ? this.attachShadow({ mode: "open" }) : this;
                }
                this.shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            catch (e) {
                options.useShadow = false;
                this.shadow = this;
                CSS_SHEET_NOT_SUPPORTED = true;
            }
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
        emulateComponent() {
            if (CSS_SHEET_NOT_SUPPORTED && options.styles) {
                let id = new Date().getTime();
                let compiledCSS = transformCSS(options.styles, `[data-cid="${id.toString()}"]`);
                console.log(compiledCSS);
                this.componentStyleTag = createSTyleTag(compiledCSS);
                this.setAttribute('data-cid', id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            this[utils_1.klass] = augmentor_1.augmentor(wrapper(target, providers, this[this._inputprop]))();
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            internalTranslationService_1.InternalTranslationService.translationComponents.set(this, options.selector);
        }
        disconnectedCallback() {
            this.componentStyleTag.remove();
            internalTranslationService_1.InternalTranslationService.translationComponents.delete(this);
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUU7QUFDakUsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkVBQTBFO0FBQzFFLHlDQUFzQztBQUN0QyxxREFBeUM7QUFDekMsMkRBQXdEO0FBRXhELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBWSxFQUFFLElBQW1CLEVBQUUsS0FBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEcsTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUMxQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQyxDQUFBO0FBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO0lBQ3pELElBQUcsTUFBTSxFQUFFO1FBQ1YsTUFBTSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDLENBQUE7QUFFRCxJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQztBQUVwQyxNQUFNLGVBQWUsR0FBRyxDQUN2QixPQUF5QixFQUN6QixNQUFnQixFQUNoQixTQUF3QixFQUN4QixNQUFlLEVBQ2QsRUFBRTtJQUNI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