"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = require("./instance");
var utils_1 = require("./utils");
var Injector = (function () {
    var _services = {};
    var _getService = function (name) {
        if (utils_1.isString(name)) {
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