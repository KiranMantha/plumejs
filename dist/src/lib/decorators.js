"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionToken = exports.Injectable = exports.Component = void 0;
const reflection_1 = require("@abraham/reflection");
const instance_1 = require("./instance");
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./service_resolver");
const getDeps = (target) => {
    const types = reflection_1.Reflection.getMetadata('design:paramtypes', target) || [];
    return types.map((a) => a.name);
};
const Component = (options) => (target) => {
    if (options.selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
    if (!window.customElements.get(options.selector)) {
        const deps = getDeps(target);
        target.prototype.selector = options.selector;
        (0, registerElement_1.registerElement)(options, target, deps);
    }
};
exports.Component = Component;
const Injectable = () => (target) => {
    const deps = getDeps(target);
    const instance = (0, instance_1.instantiate)(target, deps);
    service_resolver_1.Injector.register(target.name, instance);
};
exports.Injectable = Injectable;
const InjectionToken = (name, target) => {
    service_resolver_1.Injector.register(name, target);
};
exports.InjectionToken = InjectionToken;
