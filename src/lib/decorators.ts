//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
import '@abraham/reflection';
import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
import { DecoratorOptions } from "./types";

const getDeps = (target: Function): Array<string> => {
	let types: Array<any> = Reflect.getMetadata("design:paramtypes", target) || [];
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

let Component = (options: DecoratorOptions) => (target: Function) => {
	if (!window.customElements.get(options.selector)) {
		let obj = depsResolver(options, target);
		target.prototype.selector = options.selector;
		registerElement(options, target, obj.deps, obj.isRoot);
	}
};

const Injectable = (name?: string) => (target: Function | [...Array<string>, Function]) => {
	//let s = getDeps(target);
	let klass = (target as [...Array<string>, Function]).pop();
	let dependencies = target;
	Injector.register(name, klass, dependencies);
};

const Input = (target: any, key: string) => {
	//Reflect.defineMetadata(INPUT_METADATA_KEY, key, target.constructor);
	target.inputProp = key;
};

@Injectable()
class test { }

export { Component, Injectable, Input };

