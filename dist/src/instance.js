import { Injector } from './service_resolver';
const instantiate = (klass, dependencies, rendererInstance) => {
    if (dependencies.length) {
        const services = [];
        for (const dependency of dependencies) {
            if (dependency.prototype.__metadata__.name !== 'RENDERER') {
                services.push(Injector.getService(dependency));
            }
            else {
                services.push(rendererInstance);
            }
        }
        return new klass(...services);
    }
    else {
        return new klass();
    }
};
export { instantiate };
