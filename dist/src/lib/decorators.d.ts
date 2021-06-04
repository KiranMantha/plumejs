import { DecoratorOptions } from './types';
declare const Component: (options: DecoratorOptions) => (target: any) => void;
declare const Injectable: (name?: string) => (target: any) => void;
declare const Input: (target: any, key: string) => void;
export { Component, Injectable, Input };
