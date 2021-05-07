import { instantiate } from "./instance";
import { isFunction } from "./utils";
const Injector = new class {
    constructor() {
        this._map = new Map();
    }
    get(serviceName) {
        let instance = this._map.get(serviceName);
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${serviceName} is not a registered provider.`);
        }
    }
    clear() {
        this._map = new Map();
    }
    register(serviceName, fn, serviceNames = []) {
        if (serviceName && fn) {
            if (!this._map.get(serviceName)) {
                if (isFunction(fn)) {
                    let instance = instantiate(fn, serviceNames);
                    this._map.set(serviceName, instance);
                }
                else {
                    this._map.set(serviceName, fn);
                }
            }
        }
        else {
            throw "error: Requires name and constructor to define service";
        }
    }
};
export { Injector };
