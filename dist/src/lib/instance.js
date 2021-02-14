import { setDI } from './di';
function instantiate(fn, deps = [], props = {}) {
    let $deps = setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        instance = new $deps[0](...$deps[1]);
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
export { instantiate };
