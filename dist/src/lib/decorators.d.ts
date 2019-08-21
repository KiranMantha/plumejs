import "reflect-metadata";
import { DecoratorOptions } from "./types";
declare const Component: (options: DecoratorOptions) => (target: any) => void;
declare const MockComponent: (options: DecoratorOptions) => (target: any) => void;
declare const Injectable: () => (target: Function) => void;
declare const Input: () => (target: any, key: string) => void;
export { Component, Injectable, Input, MockComponent };
