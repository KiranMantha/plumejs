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

interface Renderer {
  update();
  emitEvent(eventName: string, data?: any);
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
