import { DecoratorOptions } from './types';
declare const Component: (options: DecoratorOptions) => (target: any) => void;
declare const Injectable: (name?: string) => (target: any) => void;
export { Component, Injectable };
