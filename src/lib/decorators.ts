//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { DecoratorOptions } from './types';
import { isFunction, isObject } from './utils';

const Component = (options: DecoratorOptions) => (target) => {
  if (options.selector.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element name!');
  }
  if (!window.customElements.get(options.selector)) {
    const klass = target[target.length - 1];
    klass.prototype.selector = options.selector;
    registerElement(options, target);
  }
};

const Injectable = (name?: string) => (target) => {
  if (name && target) {
    if (isFunction(target) || Array.isArray(target)) {
      const fn = Array.isArray(target) ? target : [target];
      const instance = instantiate(fn);
      Injector.register(name, instance);
    } else if (isObject(target)) {
      Injector.register(name, target);
    }
  } else {
    throw 'error: Requires name and (constructor or service names with constructor) to define service';
  }
};

export { Component, Injectable };
