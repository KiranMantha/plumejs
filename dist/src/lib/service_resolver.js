import { instantiate } from "./instance";
import { isFunction } from "./utils";
import { TranslationService } from "./translationService";
import { InternalRouter, Router } from "./routerService";
const Injector = (() => {
    class InternalInjector {
        constructor() {
            this._map = new Map();
            this.get = this._map.get.bind(this._map);
            this.set = this._map.set.bind(this._map);
            this._defaultServices();
        }
        _defaultServices() {
            this.registerService("TranslationService", new TranslationService());
            const _internalRouter = new InternalRouter();
            this.registerService("InternalRouter", _internalRouter);
            this.registerService("Router", new Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
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
                    if (isFunction(fn)) {
                        let instance = instantiate(fn, deps);
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
export { Injector };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDckMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVl6RCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUN0QixNQUFNLGdCQUFnQjtRQUlyQjtZQUhRLFNBQUksR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUkxQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFTyxnQkFBZ0I7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQztZQUNyRSxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FDbkIsUUFBUSxFQUNSLElBQUksTUFBTSxDQUNULGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNyRCxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFDaEQsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDdkQsQ0FDRCxDQUFDO1FBQ0gsQ0FBQztRQUVNLFVBQVUsQ0FBQyxJQUFZO1lBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxRQUFRLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLENBQUM7YUFDaEI7aUJBQU07Z0JBQ04sTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLGdDQUFnQyxDQUFDLENBQUM7YUFDckQ7UUFDRixDQUFDO1FBRU0sS0FBSztZQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRU0sZUFBZSxDQUFDLElBQVksRUFBRSxFQUFPLEVBQUUsT0FBc0IsRUFBRTtZQUNyRSxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3BCLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ25CO2lCQUNEO2FBQ0Q7aUJBQU07Z0JBQ04sTUFBTSx3REFBd0QsQ0FBQzthQUMvRDtRQUNGLENBQUM7S0FDRDtJQUVELE1BQU0sZ0JBQWdCLEdBQWMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0lBRTNELE9BQU87UUFDTixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRSxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztLQUNwRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyJ9