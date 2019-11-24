"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
const Injector = (() => {
    class InternalInjector {
        constructor() {
            let _map = new Map();
            this.get = _map.get.bind(_map);
            this.set = _map.set.bind(_map);
        }
        getService(name) {
            let instance = this.get(name);
            if (instance) {
                return instance;
            }
            else {
                throw Error(`${name} is not a registered provider.`);
            }
        }
        registerService(name, fn, deps = []) {
            if (name && fn) {
                if (!this.get(name)) {
                    if (utils_1.isFunction(fn)) {
                        let instance = instance_1.instantiate(fn, deps);
                        this.set(name, instance);
                    }
                    else {
                        this.set(name, fn);
                    }
                }
            }
            else {
                throw "error: Requires name and constructor to define service";
            }
        }
    }
    const injectorInstance = new InternalInjector();
    return {
        register: injectorInstance.registerService.bind(injectorInstance),
        get: injectorInstance.getService.bind(injectorInstance)
    };
})();
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF5QztBQUN6QyxtQ0FBcUM7QUFXckMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFFdEIsTUFBTSxnQkFBZ0I7UUFHckI7WUFDQyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRU0sVUFBVSxDQUFDLElBQVk7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFHLFFBQVEsRUFBRTtnQkFDWixPQUFPLFFBQVEsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTixNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksZ0NBQWdDLENBQUMsQ0FBQzthQUNyRDtRQUNGLENBQUM7UUFFTSxlQUFlLENBQUMsSUFBUyxFQUFFLEVBQU8sRUFBRSxPQUFzQixFQUFFO1lBQ2xFLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxrQkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLFFBQVEsR0FBRyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQjtpQkFDRDthQUNEO2lCQUFNO2dCQUNOLE1BQU0sd0RBQXdELENBQUM7YUFDL0Q7UUFDRixDQUFDO0tBQ0Q7SUFFRCxNQUFNLGdCQUFnQixHQUFhLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUUxRCxPQUFPO1FBQ04sUUFBUSxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDdkQsQ0FBQTtBQUNGLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFHSSw0QkFBUSJ9