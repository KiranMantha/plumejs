//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
import { Reflection as Reflect } from '@abraham/reflection';
import { INPUT_METADATA_KEY } from "./utils";
import { DecoratorOptions } from "./types";

const getDeps = (target: Function): Array<string> => {
	let types:Array<any> = Reflect.getMetadata("design:paramtypes", target) || [];
	let deps = types.map((a: Function) => {
		if (a) {
			if (a.name !== "Object") {
				return a.name;
			} else {
				return "props";
			}
		} else {
			return "";
		}
	});
	return deps;
};

const depsResolver = (
	options: DecoratorOptions,
	target: Function
): { deps: Array<string>; isRoot: boolean } => {
	if (options.selector.indexOf("-") <= 0) {
		throw new Error("You need at least 1 dash in the custom element name!");
	}
	let s = getDeps(target);
	let isRoot = options.root ? options.root : false;
	return {
		deps: s,
		isRoot: isRoot
	};
};

const Component = (options: DecoratorOptions) => (target: Function) => {
	let obj = depsResolver(options, target);
	registerElement(options, target, obj.deps, obj.isRoot);
};

const MockComponent = (options: DecoratorOptions, target: Function) => {
	let obj = depsResolver(options, target);
	registerElement(options, target, obj.deps, obj.isRoot, true);
};

const Injectable = () => (target: Function) => {
	let s = getDeps(target);
	Injector.register(target.name, target, s);
};

const Input = () => (target: any, key: string) => {
	Reflect.defineMetadata(INPUT_METADATA_KEY, key, target.constructor);
};

export { Component, Injectable, Input, MockComponent };
