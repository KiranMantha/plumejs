import { augmentor } from './augment';
import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentDecoratorOptions, ComponentRef, DynamicCssImport, IHooks, Renderer } from './types';
import {
  CSS_SHEET_SUPPORTED,
  Subscriptions,
  createToken,
  fromEvent,
  isPromise,
  proxifiedClass,
  sanitizeHTML
} from './utils';

const DEFAULT_COMPONENT_OPTIONS: ComponentDecoratorOptions = {
  selector: '',
  root: false,
  styles: '',
  deps: [],
  standalone: false,
  shadowDomEncapsulation: true
};

const createStyleTag = (content: string, where: Node = null) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

const registerElement = async (options: ComponentDecoratorOptions, target: Partial<IHooks>) => {
  // mapping with defaults
  options = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
  if (isPromise(options.styles)) {
    const dynamicStyles = await (options.styles as DynamicCssImport);
    options.styles = dynamicStyles.default.toString();
  }
  options.styles = options.styles.toString();

  if (options.root && !componentRegistry.isRootNodeSet) {
    componentRegistry.isRootNodeSet = true;
    if (options.styles) {
      componentRegistry.globalStyleTag = createStyleTag(options.styles, document.head);
      componentRegistry.globalStyles.replace(options.styles);
    }
  } else if (options.root && componentRegistry.isRootNodeSet) {
    throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
  }

  window.customElements.define(
    options.selector,
    class extends HTMLElement implements ComponentRef<any> {
      private klass: Record<string, any>;
      private shadow: any;
      private componentStyleTag: HTMLStyleElement = null;
      private internalSubscriptions = new Subscriptions();
      renderCount = 0;

      static get observedAttributes() {
        return target.observedAttributes || [];
      }

      constructor() {
        super();
        if (options.shadowDomEncapsulation && CSS_SHEET_SUPPORTED) {
          this.shadow = this.attachShadow({ mode: 'open' });
          this.shadow.adoptedStyleSheets = componentRegistry.getComputedCss(
            options.styles as string,
            options.standalone
          );
        } else {
          this.shadow = this;
          const id = createToken();
          this.setAttribute('data-did', id);
          const styles = (options.styles as string).replaceAll(':host', `${options.selector}[data-did='${id}']`);
          this.componentStyleTag = createStyleTag(styles, document.head);
        }
        this.getInstance = this.getInstance.bind(this);
        this.update = this.update.bind(this);
        this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this);
        this.createProxyInstance();
      }

      private createProxyInstance() {
        const rendererInstance = new Renderer(this, this.shadow);
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.emitEvent = (eventName: string, data: any) => {
          this.emitEvent(eventName, data);
        };
        this.klass = instantiate(proxifiedClass(this.setRenderIntoQueue, target), options.deps, rendererInstance);
      }

      update() {
        const renderValue = this.klass.render();
        if (typeof renderValue === 'string') {
          this.shadow.innerHTML = sanitizeHTML(renderValue);
        } else {
          render(this.shadow, renderValue);
        }
      }

      emitEvent(eventName: string, data: any) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
      }

      setProps(propsObj: Record<string, any>) {
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

      setRenderIntoQueue() {
        ++this.renderCount;
        if (this.renderCount === 1) {
          queueMicrotask(() => {
            this.update();
            this.renderCount = 0;
          });
        }
      }

      connectedCallback() {
        this.internalSubscriptions.add(
          fromEvent(this, 'bindprops', (e: CustomEvent) => {
            const propsObj = e.detail.props;
            propsObj && this.setProps(propsObj);
          })
        );
        this.internalSubscriptions.add(
          fromEvent(this, 'refresh_component', () => {
            this.update();
          })
        );
        this.internalSubscriptions.add(
          fromEvent(window, 'onLanguageChange', () => {
            this.update();
          })
        );
        if (this.klass.beforeMount) {
          this.internalSubscriptions.add(augmentor(this.setRenderIntoQueue, this.klass.beforeMount.bind(this.klass)));
        }
        this.update();
        this.klass.mount?.();
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.klass.onAttributesChanged?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.renderCount = 0;
        this.klass.unmount?.();
        this.componentStyleTag?.remove();
        this.internalSubscriptions.unsubscribe();
      }
    }
  );
};

export { registerElement };
