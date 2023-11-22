import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { Renderer } from './types';
import { CSS_SHEET_SUPPORTED, Subscriptions, fromEvent, proxifiedClass, sanitizeHTML } from './utils';
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
        internalSubscriptions = new Subscriptions();
        renderCount = 0;
        static get observedAttributes() {
            return target.observedAttributes || [];
        }
        constructor() {
            super();
            if (CSS_SHEET_SUPPORTED) {
                this.shadow = this.attachShadow({ mode: 'open' });
                this.shadow.adoptedStyleSheets = componentRegistry.getComputedCss(options.styles, options.standalone);
            }
            else {
                this.shadow = this;
                const styles = options.styles.replaceAll(':host', options.selector);
                this.componentStyleTag = createStyleTag(styles, document.head);
            }
            this.createProxyInstance();
            this.getInstance = this.getInstance.bind(this);
            this.update = this.update.bind(this);
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
        }
        emitEvent(eventName, data) {
            const event = new CustomEvent(eventName, {
                detail: data
            });
            this.dispatchEvent(event);
        }
        setProps(propsObj) {
            for (const [key, value] of Object.entries(propsObj)) {
                if (target.observedProperties.find((property) => property === key)) {
                    this.klass[key] = value;
                }
            }
            this.klass.onPropertiesChanged?.();
        }
        getInstance() {
            return this.klass;
        }
        connectedCallback() {
            this.internalSubscriptions.add(fromEvent(this, 'bindprops', (e) => {
                const propsObj = e.detail.props;
                propsObj && this.setProps(propsObj);
            }));
            this.internalSubscriptions.add(fromEvent(this, 'refresh_component', () => {
                this.klass.mount?.();
            }));
            this.internalSubscriptions.add(fromEvent(window, 'onLanguageChange', () => {
                this.update();
            }));
            this.klass.beforeMount?.();
            this.update();
            this.klass.mount?.();
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this.klass.onAttributesChanged?.(name, oldValue, newValue);
        }
        disconnectedCallback() {
            this.renderCount = 1;
            this.klass.unmount?.();
            this.componentStyleTag?.remove();
            this.internalSubscriptions.unsubscribe();
        }
    });
};
export { registerElement };
