"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registerElement_1 = require("./registerElement");
var service_resolver_1 = require("./service_resolver");
require("reflect-metadata");
var utils_1 = require("./utils");
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
    registerElement_1.registerElement(options, target, s, isRoot);
}; };
exports.Component = Component;
var Injectable = function () { return function (target) {
    var s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
}; };
exports.Injectable = Injectable;
var Input = function () { return function (target, key) {
    Reflect.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
}; };
exports.Input = Input;
//# sourceMappingURL=decorators.js.map