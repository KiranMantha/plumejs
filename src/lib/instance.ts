import { Injector } from './service_resolver';
import { jsonObject } from './types';

const instantiate = (fn: Array<any>): jsonObject => {
  const controller = fn[fn.length - 1];
  const services = [];
  for (let i = 0; i < fn.length - 1; i++) {
    services.push(Injector.getService(fn[i]));
  }
  if (services.length > 0) {
    return new controller(...services);
  } else {
    return new controller();
  }
};

export { instantiate };
