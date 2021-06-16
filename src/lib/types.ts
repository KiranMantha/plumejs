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

interface ComponentRef<T> {
  setProps(propertiesObject: jsonObject);
  getInstance(): T;
}

type jsonObject = { [index: string]: any };

export { DecoratorOptions, IHooks, jsonObject, Renderer, ComponentRef };
