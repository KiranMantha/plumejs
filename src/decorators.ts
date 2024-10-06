//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { ComponentDecoratorOptions, ConstructorType, MetadataConstructor, ServiceDecoratorOptions } from './types';

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
      (target as MetadataConstructor<T>).__selector__ = options.selector;
      registerElement(options, target);
    }
  };

const Input = () => (target: object, key: string) => {
  if (!(target as MetadataConstructor<unknown>).__inputs__) {
    (target as MetadataConstructor<unknown>).__inputs__ = [];
  }
  (target as MetadataConstructor<unknown>).__inputs__.push(key);
};

const Injectable =
  (options: ServiceDecoratorOptions = {}) =>
  <T>(target: ConstructorType<T>) => {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
    (target as MetadataConstructor<T>).__metadata__ = {
      name: 'SERVICE'
    };
    if (options.deps.some((dep) => (dep as MetadataConstructor<T>).__metadata__?.name === 'RENDERER')) {
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

export { Component, Injectable, Input };
