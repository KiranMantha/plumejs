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
      (componentRegistry.globalStyles as CSSStyleSheet).replace(options.styles);
    }
  } else if (options.root && componentRegistry.isRootNodeSet) {
    throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
  }

  window.customElements.define(
    options.selector,
    class extends HTMLElement implements ComponentRef<unknown> {
      private klass: Partial<IHooks>;
      private shadow;
      private componentStyleTag: HTMLStyleElement = null;
      private internalSubscriptions = new Subscriptions();
      private isEmulated = false;
      renderCount = 0;

      static get observedAttributes() {
        return target.observedAttributes || [];
      }

      constructor() {
        super();
        if (options.shadowDomEncapsulation && CSS_SHEET_SUPPORTED) {
          this.isEmulated = false;
          this.shadow = this.attachShadow({ mode: 'open' });
          this.shadow.adoptedStyleSheets = componentRegistry.getComputedCss(
            options.styles as string,
            options.standalone
          );
        } else {
          this.isEmulated = false;
          this.shadow = this;
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
        rendererInstance.emitEvent = <T>(eventName: string, data: T) => {
          this.emitEvent(eventName, data);
        };
        this.internalSubscriptions.add(
          augmentor(this.setRenderIntoQueue, () => {
            this.klass = instantiate<Partial<IHooks>>(
              proxifiedClass(this.setRenderIntoQueue, target),
              options.deps,
              rendererInstance
            );
          })
        );
      }

      update() {
        const renderValue = this.klass.render();
        if (typeof renderValue === 'string') {
          this.shadow.innerHTML = sanitizeHTML(renderValue);
        } else {
          render(this.shadow, renderValue);
        }
      }

      emitEvent<T>(eventName: string, data: T) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
      }

      setProps<T>(propsObj: Record<string, T>) {
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
        if (this.isEmulated) {
          const id = createToken();
          this.setAttribute('data-did', id);
          const styles = (options.styles as string).replaceAll(':host', `${options.selector}[data-did='${id}']`);
          if (!options.root && styles) {
            this.componentStyleTag = createStyleTag(styles, document.head);
          }
        }
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
        this.klass.beforeMount?.();
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
