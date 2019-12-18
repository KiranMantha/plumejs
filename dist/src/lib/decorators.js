"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://medium.com/@OlegVaraksin/minimalistic-dependency-injection-di-container-in-typescript-2ce93d1c303b
//https://jsfiddle.net/r5umxasz/
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./service_resolver");
const reflection_1 = require("@abraham/reflection");
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
    reflection_1.Reflection.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
};
exports.Input = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRHQUE0RztBQUM1RyxnQ0FBZ0M7QUFDaEMsdURBQW9EO0FBQ3BELHlEQUE4QztBQUM5QyxvREFBNEQ7QUFDNUQsbUNBQTZDO0FBRzdDLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBZ0IsRUFBaUIsRUFBRTtJQUNuRCxJQUFJLEtBQUssR0FBYyx1QkFBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVcsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxFQUFFO1lBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ04sT0FBTyxPQUFPLENBQUM7YUFDZjtTQUNEO2FBQU07WUFDTixPQUFPLEVBQUUsQ0FBQztTQUNWO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQ3BCLE9BQXlCLEVBQ3pCLE1BQWdCLEVBQzJCLEVBQUU7SUFDN0MsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0tBQ3hFO0lBQ0QsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRCxPQUFPO1FBQ04sSUFBSSxFQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUsTUFBTTtLQUNkLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLE9BQXlCLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBZ0IsRUFBRSxFQUFFO0lBQ3JFLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsaUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQztBQWdCTyw4QkFBUztBQWRsQixNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQXlCLEVBQUUsTUFBZ0IsRUFBRSxFQUFFO0lBQ3JFLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsaUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFXcUMsc0NBQWE7QUFUcEQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFnQixFQUFFLEVBQUU7SUFDN0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLDJCQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQU1rQixnQ0FBVTtBQUo5QixNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQVcsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUNoRCx1QkFBTyxDQUFDLGNBQWMsQ0FBQywwQkFBa0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FBQztBQUU4QixzQkFBSyJ9