import { ComponentDecoratorOptions, ConstructorType, ServiceDecoratorOptions } from './types';
declare const Component: (options: ComponentDecoratorOptions) => <T>(target: ConstructorType<T>) => void;
declare const Injectable: (options?: ServiceDecoratorOptions) => <T>(target: ConstructorType<T>) => void;
export { Component, Injectable };
