"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflection_1 = require("@abraham/reflection");
const registerElement_1 = require("./registerElement");
const service_resolver_1 = require("./service_resolver");
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
let Component = (options) => (target) => {
    if (!window.customElements.get(options.selector)) {
        let obj = depsResolver(options, target);
        target.prototype.selector = options.selector;
        registerElement_1.registerElement(options, target, obj.deps, obj.isRoot);
    }
};
exports.Component = Component;
const Injectable = () => (target) => {
    let s = getDeps(target);
    service_resolver_1.Injector.register(target.name, target, s);
};
exports.Injectable = Injectable;
const Input = () => (target, key) => {
    reflection_1.Reflection.defineMetadata(utils_1.INPUT_METADATA_KEY, key, target.constructor);
};
exports.Input = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG9EQUE0RDtBQUM1RCx1REFBb0Q7QUFDcEQseURBQThDO0FBQzlDLG1DQUE2QztBQUc3QyxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQWdCLEVBQWlCLEVBQUU7SUFDbkQsSUFBSSxLQUFLLEdBQWMsdUJBQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNkO2lCQUFNO2dCQUNOLE9BQU8sT0FBTyxDQUFDO2FBQ2Y7U0FDRDthQUFNO1lBQ04sT0FBTyxFQUFFLENBQUM7U0FDVjtJQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUNwQixPQUF5QixFQUN6QixNQUFnQixFQUMyQixFQUFFO0lBQzdDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztLQUN4RTtJQUNELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakQsT0FBTztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsTUFBTSxFQUFFLE1BQU07S0FDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQWdCLEVBQUUsRUFBRTtJQUNuRSxJQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2hELElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUM3QyxpQ0FBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkQ7QUFDRixDQUFDLENBQUM7QUFXTyw4QkFBUztBQVRsQixNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQWdCLEVBQUUsRUFBRTtJQUM3QyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsMkJBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBTWtCLGdDQUFVO0FBSjlCLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBVyxFQUFFLEdBQVcsRUFBRSxFQUFFO0lBQ2hELHVCQUFPLENBQUMsY0FBYyxDQUFDLDBCQUFrQixFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckUsQ0FBQyxDQUFDO0FBRThCLHNCQUFLIn0=