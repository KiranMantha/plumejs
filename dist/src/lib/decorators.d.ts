import { ComponentDecoratorOptions, ConstructorType, ServiceDecoratorOptions } from './types';
declare const Component: (options: ComponentDecoratorOptions) => (target: new (...args: any[]) => any) => void;
declare const Injectable: (options?: ServiceDecoratorOptions) => (target: new (...args: any[]) => any) => void;
declare const InjectionToken: (name: string | ConstructorType<any>, target: Record<string, any>) => any;
export { Component, Injectable, InjectionToken };
