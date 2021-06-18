interface DecoratorOptions {
  selector: string;
  styles?: string;
  root?: boolean;
  useShadow?: boolean;
}

interface IHooks {
  beforeMount?();
  mount?();
  unmount?();
  onPropsChanged?();
}

interface Renderer {
  update();
  emitEvent(eventName: string, data?: any);
}

interface IObservedProperties {
  readonly ObservedProperties;
}

interface ComponentRef<T extends IObservedProperties> {
  setProps(propertiesObject: { [K in T['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never });
  getInstance(): T;
}

type jsonObject = { [index: string]: any };

export { DecoratorOptions, IHooks, jsonObject, Renderer, ComponentRef };

