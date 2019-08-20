import { foreach, isArray } from './utils';
import { Injector } from './service_resolver';
var setDI = function (fn, deps, props) {
    var di = [], finalArr = [], func_deps = deps && isArray(deps) ? deps : [];
    if (func_deps.length > 0) {
        foreach(func_deps, function (o, i) {
            if (o !== 'props') {
                var depsrvc = Injector.get(o);
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
export { setDI };
//# sourceMappingURL=di.js.map