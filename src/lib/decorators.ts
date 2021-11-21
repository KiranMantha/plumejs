//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { Reflection as Reflect } from '@abraham/reflection';
import { instantiate } from './instance';
import { registerElement } from './registerElement';
import { Injector } from './service_resolver';
import { DecoratorOptions } from './types';

const getDeps = (target: any): Array<string> => {
  const types: Array<any> = Reflect.getMetadata('design:paramtypes', target) || [];
  return types.map((a: any) => a.name);
};

const Component = (options: DecoratorOptions) => (target) => {
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

const InjectionToken = (name: string, target: Record<string, any>) => {
  Injector.register(name, target);
};

export { Component, Injectable, InjectionToken };
