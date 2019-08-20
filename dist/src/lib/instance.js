import { setDI } from './di';
function instantiate(fn, deps, props) {
    var _a;
    if (deps === void 0) { deps = []; }
    if (props === void 0) { props = {}; }
    var $deps = setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        instance = new ((_a = $deps[0]).bind.apply(_a, [void 0].concat($deps[1])))();
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
export { instantiate };
//# sourceMappingURL=instance.js.map