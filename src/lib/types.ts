type ConstructorType<T extends { new (...args: any[]): T }> = T;

interface ComponentDecoratorOptions {
  selector: string;
  styles?: string;
  root?: boolean;
  deps?: ConstructorType<any>[];
  standalone?: boolean;
}

interface ServiceDecoratorOptions {
  deps?: ConstructorType<any>[];
}

interface IHooks {
  observedAttributes?: readonly string[];
  observedProperties?: readonly string[];
  beforeMount?: () => void;
  mount?: () => void;
  unmount?: () => void;
  onPropertiesChanged?: () => void;
  onAttributesChanged?: (name: string, oldValue: string, newValue: string) => void;
}

class Renderer {
  shadowRoot: ShadowRoot;
  update: () => void;
  emitEvent: (eventName: string, data?: any, isBubbling?: boolean) => void;
  static get __metadata__() {
    return { name: 'Renderer' };
  }
}

type InputProps<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [K in Extract<T, IHooks>['observedProperties'][number]]?: K extends keyof T ? T[K] : never;
};

interface ComponentRef<T> {
  setProps(propertiesObject: InputProps<T>): void;
  getInstance(): T;
}

export {
  ComponentDecoratorOptions,
  ServiceDecoratorOptions,
  IHooks,
  Renderer,
  ComponentRef,
  ConstructorType,
  InputProps
};
