import { isNode } from 'browser-or-node';
import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentRef, DecoratorOptions, Renderer } from './types';
import { CSS_SHEET_NOT_SUPPORTED, fromEvent } from './utils';

const COMPONENT_DATA_ATTR = 'data-compid';
const DEFAULT_COMPONENT_OPTIONS: DecoratorOptions = {
  selector: '',
  root: false,
  styles: ''
};

const createStyleTag = (content: string, where: Node = null) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

const transformCSS = (styles: string, selector: string) => {
  if (styles) {
    styles = selector + ' ' + styles.toString().replace('}', ` } ${selector} `);
  }
  return styles;
};

const registerElement = (options: DecoratorOptions, target, dependencies: string[]) => {
  // mapping with defaults
  options = { ...DEFAULT_COMPONENT_OPTIONS, ...options };
  options.styles = options.styles.toString();

  if (!isNode) {
    if (options.root && !componentRegistry.isRootNodeSet) {
      componentRegistry.isRootNodeSet = true;
      if (options.styles) {
        createStyleTag(options.styles, document.head);
        componentRegistry.globalStyles.replace(options.styles);
      }
    } else if (options.root && componentRegistry.isRootNodeSet) {
      throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
  }

  window.customElements.define(
    options.selector,
    class extends HTMLElement implements Renderer, ComponentRef<any> {
      private klass: Record<string, any>;
      private shadow: any;
      private componentStyleTag: HTMLStyleElement = null;
      eventSubscriptions: (() => void)[];

      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        if (!CSS_SHEET_NOT_SUPPORTED) {
          const adoptedStyleSheets = isNode ? [] : componentRegistry.getComputedCss(options.styles);
          this.shadow.adoptedStyleSheets = adoptedStyleSheets;
        }
        this.update = this.update.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
        this.setProps = this.setProps.bind(this);
        this.getInstance = this.getInstance.bind(this);
      }

      private emulateComponent() {
        if (CSS_SHEET_NOT_SUPPORTED && options.styles) {
          const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
          const compiledCSS = transformCSS(options.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
          this.componentStyleTag = createStyleTag(compiledCSS);
          this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
        }
      }

      connectedCallback() {
        this.emulateComponent();
        const rendererInstance = new Renderer();
        rendererInstance.update = this.update;
        rendererInstance.shadowRoot = this.shadow;
        rendererInstance.emitEvent = this.emitEvent;
        this.klass = instantiate(target, dependencies, rendererInstance);
        this.klass.beforeMount && this.klass.beforeMount();
        this.update();
        this.klass.mount && this.klass.mount();
        this.eventSubscriptions.push(
          fromEvent(window, 'onLanguageChange', () => {
            this.update();
          })
        );
      }

      update() {
        render(this.shadow, this.klass.render.bind(this.klass)());
        if (CSS_SHEET_NOT_SUPPORTED) {
          options.styles && this.shadow.insertBefore(this.componentStyleTag, this.shadow.childNodes[0]);
          componentRegistry.globalStyleTag &&
            this.shadow.insertBefore(
              document.importNode(componentRegistry.globalStyleTag, true),
              this.shadow.childNodes[0]
            );
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
        this.klass.onPropsChanged && this.klass.onPropsChanged();
        this.update();
      }

      getInstance() {
        return this.klass;
      }

      disconnectedCallback() {
        this.componentStyleTag && this.componentStyleTag.remove();
        this.klass.unmount && this.klass.unmount();
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
