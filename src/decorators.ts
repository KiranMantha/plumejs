//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { ComponentDecoratorOptions, ConstructorType, IHooks, ServiceDecoratorOptions } from './types';

const SERVICE_OPTIONS_DEFAULTS: ServiceDecoratorOptions = {
  deps: []
};

const Component =
  (options: ComponentDecoratorOptions) =>
  <T>(target: ConstructorType<T>) => {
    if (options.selector.indexOf('-') <= 0) {
      throw new Error('You need at least 1 dash in the custom element name!');
    }
    if (!window.customElements.get(options.selector)) {
      Object.defineProperty(target.prototype, 'selector', {
        get() {
          return options.selector;
        }
      });
      registerElement(options, target as Partial<IHooks>);
    }
  };

const Injectable =
  (options: ServiceDecoratorOptions = {}) =>
  <T>(target: ConstructorType<T>) => {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
    target.prototype.__metadata__ = {
      name: 'SERVICE'
    };
    if (options.deps.some((dep) => dep.prototype.__metadata__?.name === 'RENDERER')) {
      throw Error('Renderer cannot be a dependency for a service. It should be used with component');
    }
    const instance = instantiate(target, options.deps);
    Injector.register(target, instance);
  };

// const InjectionToken = <T>(name: string | ConstructorType<unknown>, target: T) => {
//   const token = typeof name === 'string' ? { name } : name;
//   Injector.register(token as unknown, target);
//   return token;
// };

export { Component, Injectable };
