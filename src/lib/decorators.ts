//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { ComponentDecoratorOptions, ConstructorType, IHooks, ServiceDecoratorOptions } from './types';

const SERVICE_OPTIONS_DEFAULTS: ServiceDecoratorOptions = {
  deps: []
};

const Component = (options: ComponentDecoratorOptions) => (target: new (...args: any[]) => any) => {
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
  (target: new (...args: any[]) => any) => {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
    if (options.deps.some((dep) => dep.__metadata__?.name === 'Renderer')) {
      throw Error('Renderer cannot be a dependency for a service. It should be used with component');
    }
    const instance = instantiate(target, options.deps);
    Injector.register(target, instance);
  };

const InjectionToken = (name: string | ConstructorType<any>, target: Record<string, any>) => {
  const token = typeof name === 'string' ? { name } : name;
  Injector.register(token, target);
  return token;
};

export { Component, Injectable, InjectionToken };
