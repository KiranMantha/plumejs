"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const service_resolver_1 = require("./service_resolver");
const setDI = (fn, deps, props) => {
    let di = [], finalArr = [], func_deps = deps && utils_1.isArray(deps) ? deps : [];
    if (func_deps.length > 0) {
        utils_1.foreach(func_deps, (o, i) => {
            if (o !== 'props') {
                let depsrvc = service_resolver_1.Injector.get(o);
                if (depsrvc) {
                    let k = depsrvc;
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