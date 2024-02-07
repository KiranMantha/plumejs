//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';

export { signal } from './augment';
export { Component, Injectable, InjectionToken } from './decorators';
export { DomTransition } from './domTransition.service';
export { html, render } from './html';
export { Injector } from './service_resolver';
export {
  ComponentDecoratorOptions,
  ComponentRef,
  IHooks,
  InputProps,
  Renderer,
  ServiceDecoratorOptions
} from './types';
export { BehaviourSubjectObs, SubjectObs, Subscriptions, fromEvent, promisify, wrapIntoObservable } from './utils';
