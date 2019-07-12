"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("./di");
function instantiate(fn, deps = [], props = {}) {
    let $deps = di_1.setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
        instance = new $deps[0](...$deps[1]);
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=instance.js.map