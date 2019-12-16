"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHVEQUFvRDtBQUNwRCx5REFBOEM7QUFDOUMsb0RBQTREO0FBQzVELG1DQUE2QztBQUc3QyxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQWdCLEVBQWlCLEVBQUU7SUFDbkQsSUFBSSxLQUFLLEdBQWMsdUJBQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNkO2lCQUFNO2dCQUNOLE9BQU8sT0FBTyxDQUFDO2FBQ2Y7U0FDRDthQUFNO1lBQ04sT0FBTyxFQUFFLENBQUM7U0FDVjtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUNwQixPQUF5QixFQUN6QixNQUFnQixFQUMyQixFQUFFO0lBQzdDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztLQUN4RTtJQUNELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakQsT0FBTztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLE1BQU07S0FDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQWdCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLGlDQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFnQk8sOEJBQVM7QUFkbEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUF5QixFQUFFLE1BQWdCLEVBQUUsRUFBRTtJQUNyRSxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLGlDQUFlLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBV3FDLHNDQUFhO0FBVHBELE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBZ0IsRUFBRSxFQUFFO0lBQzdDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QiwyQkFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFNa0IsZ0NBQVU7QUFKOUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDaEQsdUJBQU8sQ0FBQyxjQUFjLENBQUMsMEJBQWtCLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUM7QUFFOEIsc0JBQUsifQ==