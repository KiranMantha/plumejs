interface IInjector {
  getService(serviceName: string): Record<string, any>;
  register(name: string, instance: Record<string, any>): void;
  clear(): void;
}

const Injector: IInjector = new (class implements IInjector {
  #weakMap: WeakMap<{ key: string }, Record<string, any>> = new WeakMap();

  public register(serviceName: string, instance: Record<string, any>) {
    if (!this.#weakMap.get({ key: serviceName })) {
      this.#weakMap.set({ key: serviceName }, instance);
    } else {
      throw Error(`${serviceName} is not a registered service.`);
    }
  }

  public getService(serviceName: string): Record<string, any> {
    const instance = this.#weakMap.get({ key: serviceName });
    if (instance) {
      return instance;
    } else {
      throw Error(`${serviceName} is not a registered provider.`);
    }
  }

  public clear(): void {
    this.#weakMap = new WeakMap();
  }
})();

export { Injector };
