"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("@abraham/reflection");
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./router/service_resolver");
const utils_1 = require("./utils");
const getDeps = (target) => {
    let types = reflection_1.Reflection.getMetadata("design:paramtypes", target) || [];
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
        registerElement_1.registerElement(options, target, obj.deps, obj.isRoot);
    }
};
exports.Component = Component;
const Injectable = () => (target) => {
    let s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
};
exports.Injectable = Injectable;
const Input = () => (target, key) => {
    reflection_1.Reflection.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
};
exports.Input = Input;
