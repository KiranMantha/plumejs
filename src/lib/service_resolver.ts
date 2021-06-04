import { jsonObject } from './types';

interface IInjector {
  getService(serviceName: string): jsonObject;
  register(name: string, instance: jsonObject): void;
  clear(): void;
}

const Injector: IInjector = new (class implements IInjector {
  private _map: Map<string, jsonObject> = new Map();

  public register(serviceName: string, instance: jsonObject) {
    if (!this._map.get(serviceName)) {
      this._map.set(serviceName, instance);
    } else {
      throw Error(`${serviceName} is not a registered service.`);
    }
  }

  public getService(serviceName: string): jsonObject {
    const instance = this._map.get(serviceName);
    if (instance) {
      return instance;
    } else {
      throw Error(`${serviceName} is not a registered provider.`);
    }
  }

  public clear(): void {
    this._map = new Map();
  }
})();

export { Injector };
