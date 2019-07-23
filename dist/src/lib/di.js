"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var service_resolver_1 = require("./service_resolver");
var setDI = function (fn, deps, props) {
    var di = [], finalArr = [], func_deps = deps && utils_1.isArray(deps) ? deps : [];
    if (func_deps.length > 0) {
        utils_1.foreach(func_deps, function (o, i) {
            if (o !== 'props') {
                var depsrvc = service_resolver_1.Injector.get(o);
                if (depsrvc) {
                    var k = depsrvc;
                    di.push(k);
                }
            }
        });
    }
    finalArr = [fn, di];
    return finalArr;
};
exports.setDI = setDI;
//# sourceMappingURL=di.js.map