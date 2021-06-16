import { isNode } from 'browser-or-node';
import { fromEvent, Subscription } from 'rxjs';
import { componentRegistry } from './componentRegistry';
import { render } from './html';
import { instantiate } from './instance';
import { ComponentRef, DecoratorOptions, jsonObject, Renderer } from './types';
import { CSS_SHEET_NOT_SUPPORTED, isUndefined, klass } from './utils';

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
      [klass]: jsonObject;
      private _shadow: any;
      private _subscriptions: Subscription = new Subscription();
      private _componentStyleTag: HTMLStyleElement = null;
      eventListenersMap: jsonObject;

      constructor() {
        super();
        let adoptedStyleSheets = [];
        options.useShadow = isUndefined(options.useShadow) ? true : options.useShadow;
        if (!CSS_SHEET_NOT_SUPPORTED) {
          adoptedStyleSheets = isNode ? [] : componentRegistry.getComputedCss(options.useShadow, options.styles);
          if (isNode) {
            this._shadow = this;
          } else {
            this._shadow = options.useShadow ? this.attachShadow({ mode: 'open' }) : this;
          }
          this._shadow.adoptedStyleSheets = adoptedStyleSheets;
        } else {
          options.useShadow = false;
          this._shadow = this;
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
          this._componentStyleTag = createStyleTag(compiledCSS);
          this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
        }
      }

      connectedCallback() {
        this.emulateComponent();
        const fn = Array.isArray(target) ? target : [target];
        this[klass] = instantiate(fn);
        this[klass]['renderer'] = this;
        this[klass].beforeMount && this[klass].beforeMount();
        this.update();
        this[klass].mount && this[klass].mount();
        this._subscriptions.add(
          fromEvent(window, 'onLanguageChange').subscribe(() => {
            this.update();
          })
        );
      }

      update() {
        render(this._shadow, this[klass].render.bind(this[klass])());
      }

      emitEvent(eventName: string, data: any) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
      }

      setProps(propsObj: jsonObject) {
        for (const [key, value] of Object.entries(propsObj)) {
          this[klass][key] = value;
        }
        this[klass].onPropsChanged && this[klass].onPropsChanged();
        this.update();
      }

      getInstance() {
        return this[klass];
      }

      disconnectedCallback() {
        this._subscriptions.unsubscribe();
        this._componentStyleTag && this._componentStyleTag.remove();
        this[klass].unmount && this[klass].unmount();
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

