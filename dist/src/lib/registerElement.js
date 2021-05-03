import { augmentor } from "augmentor/esm";
import { isNode } from "browser-or-node";
import { render } from "lighterhtml/esm";
import { BehaviorSubject, fromEvent, Subscription } from "rxjs";
import { componentRegistry } from "./componentRegistry";
import { instantiate } from "./instance";
import { CSS_SHEET_NOT_SUPPORTED, INPUT_METADATA_KEY, isUndefined, klass } from "./utils";
const wrapper = (fn, deps, props) => () => instantiate(fn, deps, props);
const createSTyleTag = (content) => {
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
            createSTyleTag(options.styles);
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
            const _inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
            this.__properties = {};
            this.triggerInputChanged = new BehaviorSubject({
                oldValue: null,
                newValue: null
            });
            if (_inputprop) {
                Object.defineProperty(this, _inputprop, {
                    get: function () { return this.__properties[_inputprop]; },
                    set: function (newValue) {
                        let oldValue = this.__properties[_inputprop] ? { ...this.__properties[_inputprop] } : {};
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
                this.componentStyleTag = createSTyleTag(compiledCSS);
                this.setAttribute("data-cid", id.toString());
            }
        }
        connectedCallback() {
            this.emulateComponent();
            const _inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
            this[klass] = augmentor(wrapper(target, providers, this[_inputprop]))();
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
