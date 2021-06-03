import { Injector } from './service_resolver';
import { getArgs } from './utils';
const instantiate = (fn) => {
    const controller = fn[fn.length - 1];
    const services = [];
    for (let i = 0; i < fn.length - 1; i++) {
        services.push(Injector.getService(fn[i]));
    }
    if (services.length > 0) {
        const constructorArgs = getArgs(controller);
        const instance = new controller(...services);
        constructorArgs.forEach((arg, i) => {
            instance[arg] = services[i];
        });
        return instance;
    }
    else {
        return new controller();
    }
};
export { instantiate };
