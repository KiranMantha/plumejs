import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentDecoratorOptions, ComponentRef, IHooks, Renderer } from './types';
import { CSS_SHEET_SUPPORTED, fromEvent, proxifiedClass, sanitizeHTML } from './utils';

const DEFAULT_COMPONENT_OPTIONS: ComponentDecoratorOptions = {
  selector: '',
  root: false,
  styles: '',
  deps: [],
  standalone: false
};

const createStyleTag = (content: string, where: Node = null) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

const registerElement = (options: ComponentDecoratorOptions, target: Partial<IHooks>) => {
  // mapping with defaults
  options = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
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
      renderCount = 0;
      eventSubscriptions: (() => void)[] = [];

      static get observedAttributes() {
        return target.observedAttributes || [];
      }

      constructor() {
        super();
        if (CSS_SHEET_SUPPORTED) {
          this.shadow = this.attachShadow({ mode: 'open' });
          this.shadow.adoptedStyleSheets = componentRegistry.getComputedCss(options.styles, options.standalone);
        } else {
          this.shadow = this;
          this.componentStyleTag = createStyleTag(options.styles, document.head);
        }
        this.createProxyInstance();
        this.getInstance = this.getInstance.bind(this);
        this.update = this.update.bind(this);
      }

      private createProxyInstance() {
        const rendererInstance = new Renderer(this, this.shadow);
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.emitEvent = (eventName: string, data: any) => {
          this.emitEvent(eventName, data);
        };
        this.klass = instantiate(proxifiedClass(this, target), options.deps, rendererInstance);
      }

      update() {
        const renderValue = this.klass.render();
        if (typeof renderValue === 'string') {
          this.shadow.innerHTML = sanitizeHTML(renderValue);
        } else {
          render(this.shadow, renderValue);
        }
      }

      emitEvent(eventName: string, data: any, allowBubbling = true) {
        const event = new CustomEvent(eventName, {
          detail: data,
          bubbles: allowBubbling
        });
        this.dispatchEvent(event);
      }

      setProps(propsObj: Record<string, any>) {
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
        this.klass.beforeMount && this.klass.beforeMount();
        this.update();
        this.klass.mount && this.klass.mount();
        this.emitEvent(
          'bindprops',
          {
            setProps: (propsObj: Record<string, any>) => {
              this.setProps(propsObj);
            }
          },
          false
        );
        this.eventSubscriptions.push(
          fromEvent(window, 'onLanguageChange', () => {
            this.update();
          })
        );
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.klass.onAttributesChanged?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.renderCount = 1;
        this.componentStyleTag?.remove();
        this.klass.unmount?.();
        if (this.eventSubscriptions?.length) {
          for (const unsubscribe of this.eventSubscriptions) {
            unsubscribe();
          }
        }
      }
    }
  );
};

export { registerElement };
