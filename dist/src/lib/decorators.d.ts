import { DecoratorOptions } from "./types";
declare let Component: (options: DecoratorOptions) => (target: Function | Array<any>) => void;
declare const Injectable: (name?: string) => (target: Function | Array<any>) => void;
declare const Input: (target: any, key: string) => void;
export { Component, Injectable, Input };
