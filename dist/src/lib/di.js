import { Injector } from './service_resolver';
const setDI = (fn, deps, props) => {
    let di = [], finalArr = [], func_deps = deps && deps.length > 0 ? deps : [];
    if (func_deps.length > 0) {
        func_deps.map((o) => {
            if (o !== 'props') {
                let depsrvc = Injector.get(o);
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
export { setDI };
