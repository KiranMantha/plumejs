import { instantiate } from "./instance";
import { isString, isFunction } from "./utils";
var Injector = (function () {
    var _services = {};
    var _getService = function (name) {
        if (isString(name)) {
            if (_services[name]) {
                return _services[name];
            }
            else {
                throw Error(name + " is not a registered provider.");
            }
        }
        else {
            return {};
        }
    };
    function _service(name, fn, deps) {
        if (deps === void 0) { deps = []; }
        if (name && fn) {
            if (!_services[name]) {
                if (isFunction(fn)) {
                    _services[name] = instantiate(fn, deps);
                }
                else {
                    _services[name] = fn;
                }
            }
        }
        else {
            throw "error: Requires name and constructor to define service";
        }
    }
    ;
    return {
        get: _getService,
        register: _service
    };
})();
export { Injector };
//# sourceMappingURL=service_resolver.js.map