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
    registerElement_1.registerElement(options, target, obj.deps, obj.isRoot);
}; };
exports.Component = Component;
var MockComponent = function (options, target) {
    var obj = depsResolver(options, target);
    registerElement_1.registerElement(options, target, obj.deps, obj.isRoot, true);
};
exports.MockComponent = MockComponent;
var Injectable = function () { return function (target) {
    var s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
}; };
exports.Injectable = Injectable;
var Input = function () { return function (target, key) {
    Reflect.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
}; };
exports.Input = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHFEQUFvRDtBQUNwRCx1REFBOEM7QUFDOUMsNEJBQTBCO0FBQzFCLGlDQUE2QztBQUc3QyxJQUFNLE9BQU8sR0FBRyxVQUFDLE1BQVc7SUFDM0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQU07UUFDM0IsSUFBSSxDQUFDLEVBQUU7WUFDTixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN4QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDZDtpQkFBTTtnQkFDTixPQUFPLE9BQU8sQ0FBQzthQUNmO1NBQ0Q7YUFBTTtZQUNOLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7SUFDRixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsSUFBTSxZQUFZLEdBQUcsVUFBQyxPQUF5QixFQUFFLE1BQVU7SUFDMUQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0tBQ3hFO0lBQ0QsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRCxPQUFPO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUsTUFBTTtLQUNkLENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxJQUFNLFNBQVMsR0FBRyxVQUFDLE9BQXlCLElBQUssT0FBQSxVQUFDLE1BQVc7SUFDNUQsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxpQ0FBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEQsQ0FBQyxFQUhnRCxDQUdoRCxDQUFDO0FBZ0JPLDhCQUFTO0FBZGxCLElBQU0sYUFBYSxHQUFHLFVBQUMsT0FBeUIsRUFBRSxNQUFVO0lBQzNELElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsaUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFXcUMsc0NBQWE7QUFUcEQsSUFBTSxVQUFVLEdBQUcsY0FBTSxPQUFBLFVBQUMsTUFBZ0I7SUFDekMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLDJCQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsRUFId0IsQ0FHeEIsQ0FBQztBQU1rQixnQ0FBVTtBQUo5QixJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsVUFBQyxNQUFXLEVBQUUsR0FBVztJQUM1QyxPQUFPLENBQUMsY0FBYyxDQUFDLDBCQUFrQixFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckUsQ0FBQyxFQUZtQixDQUVuQixDQUFDO0FBRThCLHNCQUFLIn0=