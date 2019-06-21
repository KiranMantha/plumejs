import { foreach, isArray } from './utils';
import { getService } from './service_resolver';

const setDI = (fn:Function, deps:Array<string>, props:any):Array<any> => {
  let di:Array<any> = [],
    finalArr = [],
    func_deps = deps && isArray(deps) ? deps : [];
  if (func_deps.length > 0) {
    foreach(func_deps, (o:any, i:number) => {
      let depsrvc = {};
      if (o !== 'props') {
        depsrvc = getService(o)
      } else {
        depsrvc = props;
      }
      if (depsrvc) {
        let k = depsrvc;
        di.push(k);
      }
    });
  }
  finalArr = [fn, di];
  return finalArr;
}

export { setDI };