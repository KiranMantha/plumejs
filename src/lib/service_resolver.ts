interface IInjector {
  getService(serviceName: string): Record<string, any>;
  register(name: string, instance: Record<string, any>): void;
  clear(): void;
}

const Injector: IInjector = new (class implements IInjector {
  #map = new Map();

  public register<T>(serviceName: string, instance: Record<string, T>) {
    if (!this.#map.get(serviceName)) {
      this.#map.set(serviceName, instance);
    } else {
      throw Error(`${serviceName} is already registered service.`);
    }
  }

  public getService<T>(serviceName: string): T {
    const instance = this.#map.get(serviceName);
    if (instance) {
      return instance;
    } else {
      throw Error(`${serviceName} is not a registered provider.`);
    }
  }

  public clear(): void {
    this.#map = new Map();
  }
})();

export { Injector };
