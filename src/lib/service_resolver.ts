import { ConstructorType } from './types';

interface IInjector {
  register(klass: any, instance: ConstructorType<any>): void;
  getService(klass: ConstructorType<any>): Record<string, any>;
  removeService(klass: ConstructorType<any>);
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

  public removeService(klass: ConstructorType<any>) {
    this.map.delete(klass);
  }

  public clear(): void {
    this.map = new WeakMap();
  }
})();

export { Injector };
