"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiate = void 0;
const di_1 = require("./di");
function instantiate(fn, deps = [], props = {}) {
    let $deps = di_1.setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        instance = new $deps[0](...$deps[1]);
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
