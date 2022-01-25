type ConstructorType<T extends { new (...args: any[]): T }> = T;

interface ComponentDecoratorOptions {
  selector: string;
  styles?: string;
  root?: boolean;
  deps?: ConstructorType<any>[];
}

interface ServiceDecoratorOptions {
  deps?: ConstructorType<any>[];
}

interface IHooks {
  readonly ObservedProperties?;
  beforeMount?: () => void;
  mount?: () => void;
  unmount?: () => void;
  onPropsChanged?: () => void;
}

class Renderer {
  shadowRoot: ShadowRoot;
  update: () => void;
  emitEvent: (eventName: string, data?: any, isBubbling?: boolean) => void;
  static get __metadata__() {
    return { name: 'Renderer' };
  }
}

interface ComponentRef<T> {
  setProps(propertiesObject: {
    [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
  }): void;
  getInstance(): T;
}

export { ComponentDecoratorOptions, ServiceDecoratorOptions, IHooks, Renderer, ComponentRef, ConstructorType };
