import { ConstructorType } from './types';

interface IInjector {
  register: <T>(klass: ConstructorType<T>, instance: T) => void;
  getService: <T>(klass: T) => ConstructorType<T>;
  removeService: <T>(klass: ConstructorType<T>) => void;
  clear: () => void;
}

const Injector: IInjector = new (class implements IInjector {
  private map = new WeakMap<object, ConstructorType<object>>();

  public register<T>(klass: ConstructorType<T>, instance: T) {
    if (!this.map.get(klass as object)) {
      this.map.set(klass as object, instance as ConstructorType<object>);
    } else {
      throw Error(`${klass} is already registered service.`);
    }
  }

  public getService<T>(klass: T): ConstructorType<T> {
    const instance = this.map.get(klass as object) as ConstructorType<T>;
    if (instance) {
      return instance;
    } else {
      throw Error(`${klass} is not a registered provider.`);
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
