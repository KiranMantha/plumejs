import '@abraham/reflection';
import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
import { INPUT_METADATA_KEY } from "./utils";
const getDeps = (target) => {
    let types = Reflect.getMetadata("design:paramtypes", target) || [];
    let deps = types.map((a) => {
        if (a) {
            if (a.name !== "Object") {
                return a.name;
            }
            else {
                return "props";
            }
        }
        else {
            return "";
        }
    });
    return deps;
};
const depsResolver = (options, target) => {
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
let Component = (options) => (target) => {
    if (!window.customElements.get(options.selector)) {
        let obj = depsResolver(options, target);
        target.prototype.selector = options.selector;
        registerElement(options, target, obj.deps, obj.isRoot);
    }
};
const Injectable = () => (target) => {
    let s = getDeps(target);
    Injector.register(target.name, target, s);
};
const Input = (target, key) => {
    Reflect.defineMetadata(INPUT_METADATA_KEY, key, target.constructor);
};
export { Component, Injectable, Input };
