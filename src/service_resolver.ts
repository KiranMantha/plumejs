import { MetadataConstructor } from './types';

interface IInjector {
  register: <T>(klass: MetadataConstructor<T>, instance: T) => void;
  getService: <T>(klass: T) => MetadataConstructor<T>;
  removeService: <T>(klass: MetadataConstructor<T>) => void;
  clear: () => void;
}

const Injector: IInjector = new (class implements IInjector {
  private map = new WeakMap<object, MetadataConstructor<object>>();

  public register<T>(klass: MetadataConstructor<T>, instance: T) {
    if (!this.map.get(klass as object)) {
      this.map.set(klass as object, instance as MetadataConstructor<object>);
    } else {
      throw Error(`${klass.name} is already registered service.`);
    }
  }

  public getService<T>(klass: T): MetadataConstructor<T> {
    const instance = this.map.get(klass as object) as MetadataConstructor<T>;
    if (instance) {
      return instance;
    } else {
      throw Error(`${klass['name']} is not a registered provider.`);
    }
  }

  public removeService<T>(klass: T) {
    this.map.delete(klass as object);
  }

  public clear(): void {
    this.map = new WeakMap();
  }
})();

export { Injector };
