import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentDecoratorOptions, ComponentRef, IHooks, Renderer } from './types';
import { CSS_SHEET_NOT_SUPPORTED, fromVanillaEvent } from './utils';

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
    class extends HTMLElement implements Renderer, ComponentRef<any> {
      private klass: Record<string, any>;
      private shadow: any;
      private componentStyleTag: HTMLStyleElement = null;
      eventSubscriptions: (() => void)[] = [];

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
        this.getInstance = this.getInstance.bind(this);
      }

      private emulateComponent() {
        if (CSS_SHEET_NOT_SUPPORTED && options.styles) {
          this.componentStyleTag = createStyleTag(options.styles);
        }
      }

      update() {
        render(this.shadow, (() => this.klass.render())());
        if (CSS_SHEET_NOT_SUPPORTED) {
          options.styles && this.shadow.insertBefore(this.componentStyleTag, this.shadow.childNodes[0]);
          if (componentRegistry.globalStyleTag && !options.standalone) {
            this.shadow.insertBefore(
              document.importNode(componentRegistry.globalStyleTag, true),
              this.shadow.childNodes[0]
            );
          }
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
        this.emulateComponent();
        const rendererInstance = new Renderer();
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.shadowRoot = this.shadow;
        rendererInstance.emitEvent = (eventName: string, data: any) => {
          this.emitEvent(eventName, data);
        };
        this.klass = instantiate(target, options.deps, rendererInstance);
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
          fromVanillaEvent(window, 'onLanguageChange', () => {
            this.update();
          })
        );
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.klass.onAttributesChanged?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.componentStyleTag && this.componentStyleTag.remove();
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
