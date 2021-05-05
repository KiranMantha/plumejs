import { Injector } from './service_resolver';
const setDI = (fn, deps) => {
    let di = [], finalArr = [];
    deps.map((o) => {
        let service = Injector.get(o);
        service && di.push(service);
    });
    finalArr = [fn, di];
    return finalArr;
};
export { setDI };
