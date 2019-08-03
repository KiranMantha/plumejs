"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
const Injector = (() => {
    let _services = {};
    const _getService = (name) => {
        if (utils_1.isString(name)) {
            if (_services[name]) {
                return _services[name];
            }
            else {
                throw Error(`${name} is not a registered provider.`);
            }
        }
        else {
            return {};
        }
    };
    function _service(name, fn, deps = []) {
        if (name && fn) {
            if (!_services[name]) {
                if (utils_1.isFunction(fn)) {
                    _services[name] = instance_1.instantiate(fn, deps);
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
exports.Injector = Injector;
//# sourceMappingURL=service_resolver.js.map