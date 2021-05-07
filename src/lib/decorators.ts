//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
import { DecoratorOptions } from "./types";

let Component = (options: DecoratorOptions) => (target: Function | Array<any>) => {
	if (options.selector.indexOf("-") <= 0) {
		throw new Error("You need at least 1 dash in the custom element name!");
	}
	if (!window.customElements.get(options.selector)) {
		let klass: Type<Function> = (target as Array<any>).pop();
		let dependencies = target as string[];
		klass.prototype.selector = options.selector;
		registerElement(options, klass, dependencies, options.root || false);
	}
};

const Injectable = (name?: string) => (target: Function | Array<any>) => {
	let klass: Type<Function> = (target as Array<any>).pop();
	let dependencies = target as string[];
	Injector.register(name, klass, dependencies);
};

const Input = (target: any, key: string) => {
	target.prototype.inputProp = key;
};

export { Component, Injectable, Input };

