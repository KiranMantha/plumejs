import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
import "reflect-metadata";
import { INPUT_METADATA_KEY } from "./utils";
var getDeps = function (target) {
    var types = Reflect.getMetadata("design:paramtypes", target) || [];
    var deps = types.map(function (a) {
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
var Component = function (options) { return function (target) {
    if (options.selector.indexOf("-") <= 0) {
        throw new Error("You need at least 1 dash in the custom element name!");
    }
    var s = getDeps(target);
    var isRoot = options.root ? options.root : false;
    registerElement(options, target, s, isRoot);
}; };
var Injectable = function () { return function (target) {
    var s = getDeps(target);
    Injector.register(target.name, target, s);
}; };
var Input = function () { return function (target, key) {
    Reflect.defineMetadata(INPUT_METADATA_KEY, key, target.constructor);
}; };
export { Component, Injectable, Input };
//# sourceMappingURL=decorators.js.map