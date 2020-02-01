"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
const translationService_1 = require("./translationService");
const routerService_1 = require("./routerService");
const Injector = (() => {
    class InternalInjector {
        constructor() {
            this._map = new Map();
            this.get = this._map.get.bind(this._map);
            this.set = this._map.set.bind(this._map);
            this._defaultServices();
        }
        _defaultServices() {
            this.registerService("TranslationService", new translationService_1.TranslationService());
            const _internalRouter = new routerService_1.InternalRouter();
            this.registerService("InternalRouter", _internalRouter);
            this.registerService("Router", new routerService_1.Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
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
        clear() {
            this._map = new Map();
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
        get: injectorInstance.getService.bind(injectorInstance),
        clear: injectorInstance.clear.bind(injectorInstance)
    };
})();
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF5QztBQUN6QyxtQ0FBcUM7QUFDckMsNkRBQTBEO0FBQzFELG1EQUF5RDtBQVl6RCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUN0QixNQUFNLGdCQUFnQjtRQUlyQjtZQUhRLFNBQUksR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUkxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFTyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLHVDQUFrQixFQUFFLENBQUMsQ0FBQztZQUNyRSxNQUFNLGVBQWUsR0FBRyxJQUFJLDhCQUFjLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQ25CLFFBQVEsRUFDUixJQUFJLHNCQUFNLENBQ1QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3JELGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNoRCxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUN2RCxDQUNELENBQUM7UUFDSCxDQUFDO1FBRU0sVUFBVSxDQUFDLElBQVk7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLFFBQVEsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTixNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksZ0NBQWdDLENBQUMsQ0FBQzthQUNyRDtRQUNGLENBQUM7UUFFTSxLQUFLO1lBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFTSxlQUFlLENBQUMsSUFBWSxFQUFFLEVBQU8sRUFBRSxPQUFzQixFQUFFO1lBQ3JFLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxrQkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLFFBQVEsR0FBRyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQjtpQkFDRDthQUNEO2lCQUFNO2dCQUNOLE1BQU0sd0RBQXdELENBQUM7YUFDL0Q7UUFDRixDQUFDO0tBQ0Q7SUFFRCxNQUFNLGdCQUFnQixHQUFjLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUUzRCxPQUFPO1FBQ04sUUFBUSxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDcEQsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFSSw0QkFBUSJ9