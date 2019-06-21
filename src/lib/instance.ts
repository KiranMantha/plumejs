import { setDI } from './di';

function instantiate<T>(fn:Function, deps:Array<string> = [], props:any = {}):T {
  let $deps = setDI(fn, deps, props), instance;
  if ($deps[1].length > 0) {
    //es5: (deps[0].bind.apply(deps[0], [null].deps[1]));
    instance = new $deps[0](...$deps[1]);
  } else {
    instance = new $deps[0]();
  }
  return instance;
}

export { instantiate };