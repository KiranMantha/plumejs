interface DecoratorOptions {
  selector: string;
  styles?: string;
  root?: boolean;
  useShadow?: boolean;
}

interface IHooks {
  readonly ObservedProperties?;
  beforeMount?();
  mount?();
  unmount?();
  onPropsChanged?();
}

class Renderer {
  shadowRoot: ShadowRoot;
  update: () => void;
  emitEvent: (eventName: string, data?: any) => void;
}

interface ComponentRef<T> {
  setProps(
    propertiesObject: {
      [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
    }
  ): void;
  getInstance(): T;
}

type jsonObject = { [index: string]: any };

export { DecoratorOptions, IHooks, jsonObject, Renderer, ComponentRef };
