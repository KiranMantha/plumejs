//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';

export { Component, Injectable, InjectionToken } from './lib/decorators';
export { DomTransition } from './lib/domTransition.service';
export { useState, useFormFields } from './lib/hooks';
export { html, render } from './lib/html';
export { Injector } from './lib/service_resolver';
export { TranslationService } from './lib/translationService';
export { ComponentRef, ComponentDecoratorOptions, ServiceDecoratorOptions, IHooks, Renderer } from './lib/types';
