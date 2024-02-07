//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';

export { signal } from './lib/augment';
export { Component, Injectable, InjectionToken } from './lib/decorators';
export { DomTransition } from './lib/domTransition.service';
export { useSearchParams } from './lib/hooks';
export { html, render } from './lib/html';
export { Injector } from './lib/service_resolver';
export {
  ComponentDecoratorOptions,
  ComponentRef,
  IHooks,
  InputProps,
  Renderer,
  ServiceDecoratorOptions
} from './lib/types';
export { BehaviourSubjectObs, SubjectObs, Subscriptions, fromEvent, promisify, wrapIntoObservable } from './lib/utils';
