"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
var reflection_1 = require("@abraham/reflection");
var registerElement_1 = require("./registerElement");
var service_resolver_1 = require("./service_resolver");
var utils_1 = require("./utils");
var getDeps = function (target) {
    var types = reflection_1.Reflection.getMetadata("design:paramtypes", target) || [];
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
var depsResolver = function (options, target) {
    if (options.selector.indexOf("-") <= 0) {
        throw new Error("You need at least 1 dash in the custom element name!");
    }
    var s = getDeps(target);
    var isRoot = options.root ? options.root : false;
    return {
        deps: s,
        isRoot: isRoot
    };
};
var Component = function (options) { return function (target) {
    var obj = depsResolver(options, target);
    target.prototype.selector = options.selector;
    registerElement_1.registerElement(options, target, obj.deps, obj.isRoot);
}; };
exports.Component = Component;
var Injectable = function () { return function (target) {
    var s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
}; };
exports.Injectable = Injectable;
var Input = function () { return function (target, key) {
    reflection_1.Reflection.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
}; };
exports.Input = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRHQUE0RztBQUM1RyxnQ0FBZ0M7QUFDaEMsa0RBQTREO0FBQzVELHFEQUFvRDtBQUNwRCx1REFBOEM7QUFDOUMsaUNBQTZDO0FBRzdDLElBQU0sT0FBTyxHQUFHLFVBQUMsTUFBZ0I7SUFDaEMsSUFBSSxLQUFLLEdBQWMsdUJBQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFXO1FBQ2hDLElBQUksQ0FBQyxFQUFFO1lBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ04sT0FBTyxPQUFPLENBQUM7YUFDZjtTQUNEO2FBQU07WUFDTixPQUFPLEVBQUUsQ0FBQztTQUNWO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLElBQU0sWUFBWSxHQUFHLFVBQ3BCLE9BQXlCLEVBQ3pCLE1BQWdCO0lBRWhCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztLQUN4RTtJQUNELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakQsT0FBTztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLE1BQU07S0FDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBSSxTQUFTLEdBQUcsVUFBQyxPQUF5QixJQUFLLE9BQUEsVUFBQyxNQUFnQjtJQUMvRCxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDN0MsaUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUMsRUFKOEMsQ0FJOUMsQ0FBQztBQVdPLDhCQUFTO0FBVGxCLElBQU0sVUFBVSxHQUFHLGNBQU0sT0FBQSxVQUFDLE1BQWdCO0lBQ3pDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QiwyQkFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDLEVBSHdCLENBR3hCLENBQUM7QUFNa0IsZ0NBQVU7QUFKOUIsSUFBTSxLQUFLLEdBQUcsY0FBTSxPQUFBLFVBQUMsTUFBVyxFQUFFLEdBQVc7SUFDNUMsdUJBQU8sQ0FBQyxjQUFjLENBQUMsMEJBQWtCLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSxDQUFDLEVBRm1CLENBRW5CLENBQUM7QUFFOEIsc0JBQUsifQ==