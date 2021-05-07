import { Injector } from './service_resolver';
function instantiate(klass, serviceNames = []) {
    const services = serviceNames.map((serviceName) => {
        return Injector.get(serviceName);
    });
    if (services.length > 0) {
        return new klass(...services);
    }
    else {
        return new klass();
    }
}
export { instantiate };
