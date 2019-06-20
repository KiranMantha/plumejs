import { foreach, isArray } from './utils';
import { args } from './args';
import { getService } from './service_resolver';

const setDI = (fn:Function, deps:Array<string>, props:any):Array<any> => {
  let di:Array<any> = [],
    finalArr = [],
    func_deps = deps && isArray(deps) ? deps : [],
    $args = args(fn);
  if ($args.length > 0) {
    foreach($args, (o:any, i:number) => {
      let srvc = func_deps[i],
        depsrvc = {};
      if (o !== 'props') {
        depsrvc = getService(srvc)
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