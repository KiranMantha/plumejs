import { Injector } from './service_resolver';
const instantiate = (klass, dependencies, rendererInstance) => {
    const services = [];
    for (let i = 0; i < dependencies.length; i++) {
        if (dependencies[i] !== 'Renderer') {
            services.push(Injector.getService(dependencies[i]));
        }
        else {
            services.push(rendererInstance);
        }
    }
    if (services.length > 0) {
        return new klass(...services);
    }
    else {
        return new klass();
    }
};
export { instantiate };
