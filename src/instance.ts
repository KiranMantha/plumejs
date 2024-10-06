import { Injector } from './service_resolver';
import { MetadataConstructor, Renderer } from './types';

const instantiate = <T>(
  klass: MetadataConstructor<T>,
  dependencies: MetadataConstructor<unknown>[],
  rendererInstance?: Renderer
): T => {
  if (dependencies.length) {
    const services = [];
    for (const dependency of dependencies) {
      if (dependency.__metadata__.name !== 'RENDERER') {
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
