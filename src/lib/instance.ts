import { Injector } from './service_resolver';
import { Renderer } from './types';

const instantiate = (fn: Array<any>, rendererInstance?: Renderer): Record<string, any> => {
  const controller = fn[fn.length - 1];
  const services = [];
  for (let i = 0; i < fn.length - 1; i++) {
    if (fn[i] !== 'Renderer') {
      services.push(Injector.getService(fn[i]));
    } else {
      services.push(rendererInstance);
    }
  }
  if (services.length > 0) {
    return new controller(...services);
  } else {
    return new controller();
  }
};

export { instantiate };
