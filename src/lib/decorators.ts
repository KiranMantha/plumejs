//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { ComponentDecoratorOptions, ServiceDecoratorOptions } from './types';

const SERVICE_OPTIONS_DEFAULTS: ServiceDecoratorOptions = {
  name: '',
  deps: []
};

const Component = (options: ComponentDecoratorOptions) => (target) => {
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

const Injectable = (options: ServiceDecoratorOptions) => (target) => {
  options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
  Object.defineProperty(target.prototype, '__metadata__', {
    get() {
      return { name: options.name };
    }
  });
  const instance = instantiate(target, options.deps);
  Injector.register(target.prototype.__metadata__, instance);
};

const InjectionToken = (name: string, target: Record<string, any>) => {
  Injector.register({ name }, target);
};

export { Component, Injectable, InjectionToken };
