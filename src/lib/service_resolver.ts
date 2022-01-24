import { ConstructorType } from './types';

interface IInjector {
  getService(klass: ConstructorType<any>): Record<string, any>;
  register(klass: any, instance: ConstructorType<any>): void;
  clear(): void;
}

const Injector: IInjector = new (class implements IInjector {
  private map = new WeakMap<any, any>();

  public register<T>(klass: T, instance: T) {
    if (!this.map.get(klass)) {
      this.map.set(klass, instance);
    } else {
      throw Error(`${klass} is already registered service.`);
    }
  }

  public getService<T>(klass: T): T {
    const instance: T = this.map.get(klass);
    if (instance) {
      return instance;
    } else {
      throw Error(`${klass} is not a registered provider.`);
    }
  }

  public clear(): void {
    this.map = new WeakMap();
  }
})();

export { Injector };
