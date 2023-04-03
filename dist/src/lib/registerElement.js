import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { Renderer } from './types';
import { CSS_SHEET_NOT_SUPPORTED, fromEvent, proxifiedClass, sanitizeHTML } from './utils';
const DEFAULT_COMPONENT_OPTIONS = {
    selector: '',
    root: false,
    styles: '',
    deps: [],
    standalone: false
};
const createStyleTag = (content, where = null) => {
    const tag = document.createElement('style');
    tag.innerHTML = content;
    where && where.appendChild(tag);
    return tag;
};
const registerElement = (options, target) => {
    options = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
    options.styles = options.styles.toString();
    if (options.root && !componentRegistry.isRootNodeSet) {
        componentRegistry.isRootNodeSet = true;
        if (options.styles) {
            componentRegistry.globalStyleTag = createStyleTag(options.styles, document.head);
            componentRegistry.globalStyles.replace(options.styles);
        }
    }
    else if (options.root && componentRegistry.isRootNodeSet) {
        throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        klass;
        shadow;
        componentStyleTag = null;
        renderCount = 0;
        eventSubscriptions = [];
        static get observedAttributes() {
            return target.observedAttributes || [];
        }
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: 'open' });
            if (!CSS_SHEET_NOT_SUPPORTED) {
                const adoptedStyleSheets = componentRegistry.getComputedCss(options.styles, options.standalone);
                this.shadow.adoptedStyleSheets = adoptedStyleSheets;
            }
            this.createProxyInstance();
            this.getInstance = this.getInstance.bind(this);
            this.update = this.update.bind(this);
        }
        emulateComponent() {
            if (CSS_SHEET_NOT_SUPPORTED && options.styles) {
                this.componentStyleTag = createStyleTag(options.styles);
            }
        }
        createProxyInstance() {
            const rendererInstance = new Renderer(this, this.shadow);
            rendererInstance.update = () => {
                this.update();
            };
            rendererInstance.emitEvent = (eventName, data) => {
                this.emitEvent(eventName, data);
            };
            this.klass = instantiate(proxifiedClass(this, target), options.deps, rendererInstance);
        }
        update() {
            const renderValue = this.klass.render();
            if (typeof renderValue === 'string') {
                this.shadow.innerHTML = sanitizeHTML(renderValue);
            }
            else {
                render(this.shadow, renderValue);
            }
            if (CSS_SHEET_NOT_SUPPORTED) {
                options.styles && this.shadow.insertBefore(this.componentStyleTag, this.shadow.childNodes[0]);
                if (componentRegistry.globalStyleTag && !options.standalone) {
                    this.shadow.insertBefore(document.importNode(componentRegistry.globalStyleTag, true), this.shadow.childNodes[0]);
                }
            }
        }
        emitEvent(eventName, data, allowBubbling = true) {
            const event = new CustomEvent(eventName, {
                detail: data,
                bubbles: allowBubbling
            });
            this.dispatchEvent(event);
        }
        setProps(propsObj) {
            for (const [key, value] of Object.entries(propsObj)) {
                this.klass[key] = value;
            }
            this.klass.onPropertiesChanged?.();
            this.update();
        }
        getInstance() {
            return this.klass;
        }
        connectedCallback() {
            this.emulateComponent();
            this.klass.beforeMount && this.klass.beforeMount();
            this.update();
            this.klass.mount && this.klass.mount();
            this.emitEvent('bindprops', {
                setProps: (propsObj) => {
                    this.setProps(propsObj);
                }
            }, false);
            this.eventSubscriptions.push(fromEvent(window, 'onLanguageChange', () => {
                this.update();
            }));
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this.klass.onAttributesChanged?.(name, oldValue, newValue);
        }
        disconnectedCallback() {
            this.renderCount = 1;
            this.componentStyleTag && this.componentStyleTag.remove();
            this.klass.unmount?.();
            if (this.eventSubscriptions?.length) {
                for (const unsubscribe of this.eventSubscriptions) {
                    unsubscribe();
                }
            }
        }
    });
};
export { registerElement };
