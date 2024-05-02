export type ConstructorType<T extends { new (...args: any[]): T }> = T;
export type DynamicCssImport = Promise<typeof import('*.scss') | typeof import('*.css') | typeof import('*.less')>;

export interface ComponentDecoratorOptions {
  selector: string;
  styles?: string | DynamicCssImport;
  root?: boolean;
  deps?: ConstructorType<any>[];
  standalone?: boolean;
  shadowDomEncapsulation?: boolean;
}

export interface ServiceDecoratorOptions {
  deps?: ConstructorType<any>[];
}

export interface IHooks {
  observedAttributes?: readonly string[];
  observedProperties?: readonly string[];
  render: () => DocumentFragment | string;
  beforeMount?: () => void;
  mount?: () => void;
  unmount?: () => void;
  onPropertiesChanged?: () => void;
  onAttributesChanged?: (name: string, oldValue: string, newValue: string) => void;
}

export class Renderer {
  private _hostElement: HTMLElement;
  private _shadowRoot: ShadowRoot;

  get __metadata__() {
    return { name: 'RENDERER' };
  }

  get hostElement() {
    return this._hostElement;
  }

  get shadowRoot() {
    return this._shadowRoot;
  }

  update: () => void;
  emitEvent: (eventName: string, data?: any, isBubbling?: boolean) => void;

  constructor(_hostElement: HTMLElement, _shadowRoot: ShadowRoot) {
    this._hostElement = _hostElement;
    this._shadowRoot = _shadowRoot;
  }
}

export type InputProps<T> = {
  [K in Extract<T, IHooks>['observedProperties'][number]]?: K extends keyof T ? T[K] : never;
};

export interface ComponentRef<T> {
  setProps(propertiesObject: InputProps<T>): void;
  getInstance(): T;
}

// export {
//   ComponentDecoratorOptions,
//   ComponentRef,
//   ConstructorType,
//   DynamicCssImport,
//   IHooks,
//   InputProps,
//   Renderer,
//   ServiceDecoratorOptions
// };
