import { DecoratorOptions } from './types';
declare const Component: (options: DecoratorOptions) => (target: any) => void;
declare const Injectable: () => (target: any) => void;
declare const InjectionToken: (name: string, target: Record<string, any>) => void;
export { Component, Injectable, InjectionToken };
