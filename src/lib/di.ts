import { foreach, isArray } from './utils';
import { args } from './args';
import { getService } from './service_resolver';

const setDI = (fn:Function, deps:Array<string>, props:any):Array<any> => {
  let di:Array<any> = [],
    finalArr = [],
    func_deps = deps && isArray(deps) ? deps : [],
    props_arg = '',
    $args = args(fn);
  if (func_deps.length > 0) {
    foreach(func_deps, (o:any, i:number) => {
      let depsrvc = {};
      if (o !== 'props') {
        depsrvc = getService(o)
      } else {
        depsrvc = props;
        props_arg = $args[i];
      }
      if (depsrvc) {
        let k = depsrvc;
        di.push(k);
      }
    });
  }
  finalArr = [fn, di, props_arg];
  return finalArr;
}

export { setDI };