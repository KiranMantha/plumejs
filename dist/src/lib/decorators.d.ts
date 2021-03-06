import { DecoratorOptions } from "./types";
declare let Component: (options: DecoratorOptions) => (target: Function) => void;
declare const Injectable: () => (target: Function) => void;
declare const Input: () => (target: any, key: string) => void;
export { Component, Injectable, Input };
