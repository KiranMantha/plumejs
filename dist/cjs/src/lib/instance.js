"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instantiate = void 0;
const service_resolver_1 = require("./service_resolver");
const instantiate = (klass, dependencies, rendererInstance) => {
    if (dependencies.length) {
        const services = [];
        for (const dependency of dependencies) {
            if (!dependency.__metadata__) {
                services.push(service_resolver_1.Injector.getService(dependency));
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
exports.instantiate = instantiate;
