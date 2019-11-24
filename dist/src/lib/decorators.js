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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUFvRDtBQUNwRCx5REFBOEM7QUFDOUMsNEJBQTBCO0FBQzFCLG1DQUE2QztBQUc3QyxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQVcsRUFBZ0IsRUFBRTtJQUM3QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7UUFDL0IsSUFBSSxDQUFDLEVBQUU7WUFDTixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUN4QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDZDtpQkFBTTtnQkFDTixPQUFPLE9BQU8sQ0FBQzthQUNmO1NBQ0Q7YUFBTTtZQUNOLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7SUFDRixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUF5QixFQUFFLE1BQVUsRUFBeUMsRUFBRTtJQUNyRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7S0FDeEU7SUFDRCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pELE9BQU87UUFDTixJQUFJLEVBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxNQUFNO0tBQ2QsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQUVELE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtJQUNoRSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLGlDQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFnQk8sOEJBQVM7QUFkbEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUF5QixFQUFFLE1BQVUsRUFBRSxFQUFFO0lBQy9ELElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsaUNBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFXcUMsc0NBQWE7QUFUcEQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFnQixFQUFFLEVBQUU7SUFDN0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLDJCQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQU1rQixnQ0FBVTtBQUo5QixNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQVcsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUNoRCxPQUFPLENBQUMsY0FBYyxDQUFDLDBCQUFrQixFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckUsQ0FBQyxDQUFDO0FBRThCLHNCQUFLIn0=