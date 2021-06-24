import { isNode } from 'browser-or-node';
import { fromEvent, Subscription } from 'rxjs';
import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentRef, DecoratorOptions, jsonObject, Renderer } from './types';
import { CSS_SHEET_NOT_SUPPORTED, isUndefined } from './utils';

const COMPONENT_DATA_ATTR = 'data-compid';

const createStyleTag = (content: string) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  document.head.appendChild(tag);
  return tag;
};

const transformCSS = (styles: string, selector: string) => {
  if (styles) {
    styles = selector + ' ' + styles.toString().replace('}', ` } ${selector} `);
  }
  return styles;
};

const registerElement = (options: DecoratorOptions, target: Array<any>, isRoot: boolean) => {
  if (!isNode) {
    if (isRoot && !componentRegistry.isRootNodeSet && options.styles) {
      componentRegistry.isRootNodeSet = true;
      createStyleTag(options.styles);
      componentRegistry.globalStyles.replace((options.styles || '').toString());
    } else if (isRoot && componentRegistry.isRootNodeSet) {
      throw Error('Cannot register duplicate root component in ' + options.selector + ' component');
    }
  }

  window.customElements.define(
    options.selector,
    class extends HTMLElement implements Renderer, ComponentRef<any> {
      #klass: jsonObject;
      #shadow: any;
      #subscriptions: Subscription = new Subscription();
      #componentStyleTag: HTMLStyleElement = null;
      eventListenersMap: jsonObject;

      constructor() {
        super();
        let adoptedStyleSheets = [];
        options.useShadow = isUndefined(options.useShadow) ? true : options.useShadow;
        if (!CSS_SHEET_NOT_SUPPORTED) {
          adoptedStyleSheets = isNode ? [] : componentRegistry.getComputedCss(options.useShadow, options.styles);
          if (isNode) {
            this.#shadow = this;
          } else {
            this.#shadow = options.useShadow ? this.attachShadow({ mode: 'open' }) : this;
          }
          this.#shadow.adoptedStyleSheets = adoptedStyleSheets;
        } else {
          options.useShadow = false;
          this.#shadow = this;
        }
        this.update = this.update.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
        this.setProps = this.setProps.bind(this);
        this.getInstance = this.getInstance.bind(this);
      }

      private emulateComponent() {
        if (!isNode && CSS_SHEET_NOT_SUPPORTED && options.styles && !options.root) {
          const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
          const compiledCSS = transformCSS(options.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
          this.#componentStyleTag = createStyleTag(compiledCSS);
          this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
        }
      }

      connectedCallback() {
        this.emulateComponent();
        const rendererInstance = new Renderer();
        rendererInstance.update = this.update;
        rendererInstance.shadowRoot = this.#shadow;
        rendererInstance.emitEvent = this.emitEvent;
        this.#klass = instantiate(target, rendererInstance);
        this.#klass.beforeMount && this.#klass.beforeMount();
        this.update();
        this.#klass.mount && this.#klass.mount();
        this.#subscriptions.add(
          fromEvent(window, 'onLanguageChange').subscribe(() => {
            this.update();
          })
        );
      }

      update() {
        render(this.#shadow, this.#klass.render.bind(this.#klass)());
      }

      emitEvent(eventName: string, data: any, isBubbling = true) {
        const event = new CustomEvent(eventName, {
          detail: data,
          bubbles: isBubbling
        });
        this.dispatchEvent(event);
      }

      setProps(propsObj: jsonObject) {
        for (const [key, value] of Object.entries(propsObj)) {
          this.#klass[key] = value;
        }
        this.#klass.onPropsChanged && this.#klass.onPropsChanged();
        this.update();
      }

      getInstance() {
        return this.#klass;
      }

      disconnectedCallback() {
        this.#subscriptions.unsubscribe();
        this.#componentStyleTag && this.#componentStyleTag.remove();
        this.#klass.unmount && this.#klass.unmount();
        if (this.eventListenersMap) {
          for (const [key, value] of Object.entries(this.eventListenersMap)) {
            this.removeEventListener(key, value);
          }
        }
        this.eventListenersMap = null;
      }
    }
  );
};

export { registerElement };
