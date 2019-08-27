"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
const Injector = (() => {
    class InternalInjector {
        constructor() {
            let _map = new Map();
            this.get = _map.get.bind(_map);
            this.set = _map.set.bind(_map);
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
        registerService(name, fn, deps = []) {
            if (name && fn) {
                if (!this.get(name)) {
                    if (utils_1.isFunction(fn)) {
                        let instance = instance_1.instantiate(fn, deps);
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
        get: injectorInstance.getService.bind(injectorInstance)
    };
})();
exports.Injector = Injector;
//# sourceMappingURL=service_resolver.js.map