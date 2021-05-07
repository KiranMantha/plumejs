import { Injector } from './service_resolver';

function instantiate(klass: Type<Function>, serviceNames: Array<string> = []) {
  const services = serviceNames.map((serviceName: string) => {
    return Injector.get(serviceName);
  });
  if (services.length > 0) {
    return new klass(...services);
  } else {
    return new klass();
  }
}

export { instantiate };

