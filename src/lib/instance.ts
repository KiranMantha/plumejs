import { setDI } from './di';
import { augmentor } from "augmentor";

const wrapper = (fn: Function, deps: Array<string>, props: any) => {
	return () => {
    let $deps = setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
      //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
      instance = new $deps[0](...$deps[1]);
    } else {
      instance = new $deps[0]();
    }
    return instance;
  };
};

function instantiate(fn:Function, deps:Array<string> = [], props:any = {}) {
  let instance = augmentor(wrapper(fn, deps, props))();
  return instance;
}

export { instantiate };