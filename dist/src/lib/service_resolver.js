import { instantiate } from "./instance";
import { isFunction } from "./utils";
const Injector = (() => {
    class InternalInjector {
        constructor() {
            this._map = new Map();
            this.get = this._map.get.bind(this._map);
            this.set = this._map.set.bind(this._map);
        }
        getService(name) {
            let instance = this.get(name);
            if (instance) {
                return instance;
            }
            else {
                throw Error(`${name} is not a registered provider.`);
            }
        }
        clear() {
            this._map = new Map();
        }
        registerService(name, fn, deps = []) {
            if (name && fn) {
                if (!this.get(name)) {
                    if (isFunction(fn)) {
                        let instance = instantiate(fn, deps);
                        this.set(name, instance);
                    }
                    else {
                        this.set(name, fn);
                    }
                }
            }
            else {
                throw "error: Requires name and constructor to define service";
            }
        }
    }
    const injectorInstance = new InternalInjector();
    return {
        register: injectorInstance.registerService.bind(injectorInstance),
        get: injectorInstance.getService.bind(injectorInstance),
        clear: injectorInstance.clear.bind(injectorInstance)
    };
})();
export { Injector };
