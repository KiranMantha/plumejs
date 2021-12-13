"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiate = void 0;
const service_resolver_1 = require("./service_resolver");
const instantiate = (klass, dependencies, rendererInstance) => {
    const services = [];
    for (let i = 0; i < dependencies.length; i++) {
        if (dependencies[i] !== 'Renderer') {
            services.push(service_resolver_1.Injector.getService(dependencies[i]));
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
exports.instantiate = instantiate;
