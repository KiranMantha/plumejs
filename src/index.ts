//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';

export { signal } from './augment';
export type { Signal } from './augment';
export { Component, Injectable, Input } from './decorators';
export { html, render } from './html';
export { Injector } from './service_resolver';
export { Renderer } from './types';
export type { ComponentDecoratorOptions, ComponentRef, IHooks, InputProps, ServiceDecoratorOptions } from './types';
export { BehaviourSubjectObs, SubjectObs, Subscriptions, fromEvent, promisify, wrapIntoObservable } from './utils';
