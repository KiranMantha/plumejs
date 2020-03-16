"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
const translationService_1 = require("./translationService");
const routerService_1 = require("./routerService");
const browser_or_node_1 = require("browser-or-node");
const Injector = (() => {
    class InternalInjector {
        constructor() {
            this._map = new Map();
            this.get = this._map.get.bind(this._map);
            this.set = this._map.set.bind(this._map);
            this._defaultServices();
        }
        _defaultServices() {
            if (!browser_or_node_1.isNode) {
                let compiledCSSObj = JSON.parse(JSON.stringify(process.env.COMPILEDCSSOBJ));
                this.registerService("COMPILEDCSS", new Map(Object.entries(compiledCSSObj)));
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF5QztBQUN6QyxtQ0FBcUM7QUFDckMsNkRBQTBEO0FBQzFELG1EQUF5RDtBQUN6RCxxREFBeUM7QUFZekMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsTUFBTSxnQkFBZ0I7UUFJckI7WUFIUSxTQUFJLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUM7WUFJMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRU8sZ0JBQWdCO1lBQ3ZCLElBQUcsQ0FBQyx3QkFBTSxFQUFFO2dCQUNYLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLHVDQUFrQixFQUFFLENBQUMsQ0FBQztZQUNyRSxNQUFNLGVBQWUsR0FBRyxJQUFJLDhCQUFjLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQ25CLFFBQVEsRUFDUixJQUFJLHNCQUFNLENBQ1QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3JELGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNoRCxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUN2RCxDQUNELENBQUM7UUFDSCxDQUFDO1FBRU0sVUFBVSxDQUFDLElBQVk7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLFFBQVEsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTixNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksZ0NBQWdDLENBQUMsQ0FBQzthQUNyRDtRQUNGLENBQUM7UUFFTSxLQUFLO1lBQ1gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFTSxlQUFlLENBQUMsSUFBWSxFQUFFLEVBQU8sRUFBRSxPQUFzQixFQUFFO1lBQ3JFLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxrQkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLFFBQVEsR0FBRyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQjtpQkFDRDthQUNEO2lCQUFNO2dCQUNOLE1BQU0sd0RBQXdELENBQUM7YUFDL0Q7UUFDRixDQUFDO0tBQ0Q7SUFFRCxNQUFNLGdCQUFnQixHQUFjLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUUzRCxPQUFPO1FBQ04sUUFBUSxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDcEQsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFSSw0QkFBUSJ9