import { Injector } from './service_resolver';
import { Renderer } from './types';

const instantiate = (klass, dependencies: string[], rendererInstance?: Renderer): Record<string, any> => {
  const services = [];
  for (let i = 0; i < dependencies.length; i++) {
    if (dependencies[i] !== 'Renderer') {
      services.push(Injector.getService(dependencies[i]));
    } else {
      services.push(rendererInstance);
    }
  }
  if (services.length > 0) {
    return new klass(...services);
  } else {
    return new klass();
  }
};

export { instantiate };
