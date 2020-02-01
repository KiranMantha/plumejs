import { setDI } from './di';
import { augmentor } from "augmentor";



function instantiate(fn:Function, deps:Array<string> = [], props:any = {}) {
  let $deps = setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
      //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
      instance = new $deps[0](...$deps[1]);
    } else {
      instance = new $deps[0]();
    }
    return instance;
}

export { instantiate };