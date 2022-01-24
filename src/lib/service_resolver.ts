import { ConstructorType } from './types';

interface IInjector {
  getService(klass: ConstructorType<any>): Record<string, any>;
  register(metadata: { name: string }, instance: Record<string, any>): void;
  clear(): void;
}

const Injector: IInjector = new (class implements IInjector {
  private map = new Map();

  public register<T>(metadata: { name: string }, instance: Record<string, T>) {
    if (!this.map.get(metadata.name)) {
      this.map.set(metadata.name, instance);
    } else {
      throw Error(`${metadata.name} is already registered service.`);
    }
  }

  public getService<T>(klass: ConstructorType<any>): T {
    const metadata = klass.prototype.__metadata__;
    const instance = this.map.get(metadata.name);
    if (instance) {
      return instance;
    } else {
      throw Error(`${metadata.name} is not a registered provider.`);
    }
  }

  public clear(): void {
    this.map = new Map();
  }
})();

export { Injector };
