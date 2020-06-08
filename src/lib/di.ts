import { Injector } from './router/service_resolver';

const setDI = (fn:Function, deps:Array<string>, props:any):Array<any> => {
  let di:Array<any> = [],
    finalArr = [],
    func_deps = deps && deps.length > 0 ? deps : [];
  if (func_deps.length > 0) {
    func_deps.map((o:string) => {
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
}

export { setDI };