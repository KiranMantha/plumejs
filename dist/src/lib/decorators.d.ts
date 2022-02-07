import { ComponentDecoratorOptions, ServiceDecoratorOptions } from './types';
declare const Component: (options: ComponentDecoratorOptions) => (target: new (...args: any[]) => any) => void;
declare const Injectable: (options?: ServiceDecoratorOptions) => (target: new (...args: any[]) => any) => void;
declare const InjectionToken: (name: string, target: Record<string, any>) => void;
export { Component, Injectable, InjectionToken };
