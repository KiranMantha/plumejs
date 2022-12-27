import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
const SERVICE_OPTIONS_DEFAULTS = {
    deps: []
};
const Component = (options) => (target) => {
    if (options.selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
    if (!window.customElements.get(options.selector)) {
        Object.defineProperty(target.prototype, 'selector', {
            get() {
                return options.selector;
            }
        });
        registerElement(options, target);
    }
};
const Injectable = (options = {}) => (target) => {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
    const instance = instantiate(target, options.deps);
    Injector.register(target, instance);
};
const InjectionToken = (name, target) => {
    Injector.register({ name }, target);
};
export { Component, Injectable, InjectionToken };
