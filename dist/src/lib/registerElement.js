import { augmentor } from "augmentor/esm";
import { isNode } from "browser-or-node";
import { render } from "lighterhtml/esm";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";
import { componentRegistry } from "./componentRegistry";
import { instantiate } from "./instance";
import { CSS_SHEET_NOT_SUPPORTED, isUndefined, klass } from "./utils";
const wrapper = (klass, serviceNames) => () => instantiate(klass, serviceNames);
const createStyleTag = (content) => {
    let tag = document.createElement("style");
    tag.innerHTML = content;
    document.head.appendChild(tag);
    return tag;
};
const transformCSS = (styles, selector) => {
    if (styles) {
        styles = selector + " " + styles.toString().replace("}", ` } ${selector} `);
    }
    return styles;
};
const registerElement = (options, target, providers, isRoot) => {
    if (!isNode) {
        if (isRoot && !componentRegistry.isRootNodeSet && options.styles) {
            componentRegistry.isRootNodeSet = true;
            createStyleTag(options.styles);
            componentRegistry.globalStyles.replace((options.styles || "").toString());
        }
        else if (isRoot && componentRegistry.isRootNodeSet) {
            throw Error("Cannot register duplicate root component in " +
                options.selector +
                " component");
        }
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.subscriptions = new Subscription();
            this.componentStyleTag = null;
            this.update = () => {
                this.init();
            };
            this.getModel = () => {
                return this[klass];
            };
            let adoptedStyleSheets = [];
            options.useShadow = isUndefined(options.useShadow)
                ? true
                : options.useShadow;
            if (!CSS_SHEET_NOT_SUPPORTED) {
                adoptedStyleSheets = isNode
                    ? []
                    : componentRegistry.getComputedCss(options.useShadow, options.styles);
                if (isNode) {
                    this.shadow = this;
                }
                else {
                    this.shadow = options.useShadow
                        ? this.attachShadow({ mode: "open" })
                        : this;
                }
                this.shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            else {
                options.useShadow = false;
                this.shadow = this;
            }
            const _inputprop = target.inputProp;
            this.__properties = {};
            this.triggerInputChanged = new BehaviorSubject({
                oldValue: null,
                newValue: null
            });
            if (_inputprop) {
                Object.defineProperty(this, _inputprop, {
                    get: function () { return this.__properties[_inputprop]; },
                    set: function (newValue) {
                        let oldValue = this.__properties[_inputprop] || null;
                        let joldval = JSON.stringify(oldValue);
                        let jnewval = JSON.stringify(newValue);
                        if (joldval !== jnewval) {
                            this.triggerInputChanged.next({ oldValue, newValue });
                        }
                        this.__properties[_inputprop] = newValue;
                    }
                });
            }
        }
        init() {
            let _returnfn = this[klass].render.bind(this[klass]);
            render.bind(this[klass], this.shadow, _returnfn)();
        }
        emulateComponent() {
            if (!isNode &&
                CSS_SHEET_NOT_SUPPORTED &&
                options.styles &&
                !options.root) {
                let id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
                let compiledCSS = transformCSS(options.styles, `[data-cid="${id.toString()}"]`);
                this.componentStyleTag = createStyleTag(compiledCSS);
                this.setAttribute("data-cid", id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            const _inputprop = target.inputProp;
            this[klass] = augmentor(wrapper(target, providers))();
            this[klass]["element"] = this.shadow;
            this[klass].beforeMount && this[klass].beforeMount();
            this.init();
            this[klass]["update"] = this.update.bind(this);
            this[klass].mount && this[klass].mount();
            this.subscriptions.add(this.triggerInputChanged.subscribe((obj) => {
                if (obj.oldValue || obj.newValue) {
                    this[klass][_inputprop] = obj.newValue;
                    this[klass].inputChanged && this[klass].inputChanged(obj.oldValue, obj.newValue);
                    this.update();
                }
            }));
            this.subscriptions.add(fromEvent(window, 'onLanguageChange').subscribe(() => {
                this.update();
            }));
        }
        disconnectedCallback() {
            this.__properties = {};
            this.subscriptions.unsubscribe();
            this.componentStyleTag && this.componentStyleTag.remove();
            this[klass].unmount && this[klass].unmount();
        }
    });
};
export { registerElement };
