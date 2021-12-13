import { Reflection as Reflect } from '@abraham/reflection';
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
const getDeps = (target) => {
    const types = Reflect.getMetadata('design:paramtypes', target) || [];
    return types.map((a) => a.name);
};
const Component = (options) => (target) => {
    if (options.selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
    if (!window.customElements.get(options.selector)) {
        const deps = getDeps(target);
        target.prototype.selector = options.selector;
        registerElement(options, target, deps);
    }
};
const Injectable = () => (target) => {
    const deps = getDeps(target);
    const instance = instantiate(target, deps);
    Injector.register(target.name, instance);
};
const InjectionToken = (name, target) => {
    Injector.register(name, target);
};
export { Component, Injectable, InjectionToken };
