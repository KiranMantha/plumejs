"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args = (fn) => {
    return Function.toString
        .call(fn)
        .replace(/[/][/].*$/gm, "") // strip single-line comments
        .replace(/\s+/g, "") // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, "") // strip multi-line comments
        .split("){", 1)[0]
        .replace(/^[^(]*[(]/, "") // extract the parameters
        .replace(/=[^,]+/g, "") // strip any ES6 defaults
        .split(",")
        .filter(Boolean); // split & filter [""]
};
exports.args = args;
//# sourceMappingURL=args.js.map