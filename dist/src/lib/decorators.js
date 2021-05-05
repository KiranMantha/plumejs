import { registerElement } from "./registerElement";
import { Injector } from "./service_resolver";
let Component = (options) => (target) => {
    if (options.selector.indexOf("-") <= 0) {
        throw new Error("You need at least 1 dash in the custom element name!");
    }
    if (!window.customElements.get(options.selector)) {
        let klass = target.pop();
        let dependencies = target;
        klass.prototype.selector = options.selector;
        registerElement(options, klass, dependencies, options.root || false);
    }
};
const Injectable = (name) => (target) => {
    let klass = target.pop();
    let dependencies = target;
    Injector.register(name, klass, dependencies);
};
const Input = (target, key) => {
    target.prototype.inputProp = key;
};
export { Component, Injectable, Input };
