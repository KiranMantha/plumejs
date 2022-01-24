"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionToken = exports.Injectable = exports.Component = void 0;
const instance_1 = require("./instance");
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./service_resolver");
const SERVICE_OPTIONS_DEFAULTS = {
    name: '',
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
        (0, registerElement_1.registerElement)(options, target);
    }
};
exports.Component = Component;
const Injectable = (options) => (target) => {
    options = Object.assign(Object.assign({}, SERVICE_OPTIONS_DEFAULTS), options);
    Object.defineProperty(target.prototype, '__metadata__', {
        get() {
            return { name: options.name };
        }
    });
    const instance = (0, instance_1.instantiate)(target, options.deps);
    service_resolver_1.Injector.register(target.prototype.__metadata__, instance);
};
exports.Injectable = Injectable;
const InjectionToken = (name, target) => {
    service_resolver_1.Injector.register({ name }, target);
};
exports.InjectionToken = InjectionToken;
