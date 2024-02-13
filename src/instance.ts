import { Injector } from './service_resolver';
import { ConstructorType, Renderer } from './types';

const instantiate = (
  klass: ConstructorType<any>,
  dependencies: ConstructorType<any>[],
  rendererInstance?: Renderer
): Record<string, any> => {
  if (dependencies.length) {
    const services = [];
    for (const dependency of dependencies) {
      if (dependency.prototype.__metadata__.name !== 'RENDERER') {
        services.push(Injector.getService(dependency));
      } else {
        services.push(rendererInstance);
      }
    }
    return new klass(...services);
  } else {
    return new klass();
  }
};

export { instantiate };
