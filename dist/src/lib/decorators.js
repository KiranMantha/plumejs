"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./service_resolver");
require("reflect-metadata");
const utils_1 = require("./utils");
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
const Component = (options) => (target) => {
    let obj = depsResolver(options, target);
    registerElement_1.registerElement(options, target, obj.deps, obj.isRoot);
};
exports.Component = Component;
const MockComponent = (options, target) => {
    let obj = depsResolver(options, target);
    registerElement_1.registerElement(options, target, obj.deps, obj.isRoot, true);
};
exports.MockComponent = MockComponent;
const Injectable = () => (target) => {
    let s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
};
exports.Injectable = Injectable;
const Input = () => (target, key) => {
    Reflect.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
};
exports.Input = Input;
//# sourceMappingURL=decorators.js.map