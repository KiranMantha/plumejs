import { instantiate } from "./instance";
import { isFunction } from "./utils";
var Injector = (function () {
    var InternalInjector = (function () {
        function InternalInjector() {
            var _map = new Map();
            this.get = _map.get.bind(_map);
            this.set = _map.set.bind(_map);
        }
        InternalInjector.prototype.getService = function (name) {
            var instance = this.get(name);
            if (instance) {
                return instance;
            }
            else {
                throw Error(name + " is not a registered provider.");
            }
        };
        InternalInjector.prototype.registerService = function (name, fn, deps) {
            if (deps === void 0) { deps = []; }
            if (name && fn) {
                if (!this.get(name)) {
                    if (isFunction(fn)) {
                        var instance = instantiate(fn, deps);
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
        };
        return InternalInjector;
    }());
    var injectorInstance = new InternalInjector();
    return {
        register: injectorInstance.registerService.bind(injectorInstance),
        get: injectorInstance.getService.bind(injectorInstance)
    };
})();
export { Injector };
//# sourceMappingURL=service_resolver.js.map