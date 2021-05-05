import { setDI } from './di';

function instantiate(fn: Function, deps: Array<string> = []) {
  let $deps = setDI(fn, deps), instance;
  if ($deps[1].length > 0) {
    instance = new $deps[0](...$deps[1]);
  } else {
    instance = new $deps[0]();
  }
  return instance;
}

export { instantiate };

