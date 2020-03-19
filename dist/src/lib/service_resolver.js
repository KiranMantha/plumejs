"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instance_1 = require("./instance");
const utils_1 = require("./utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUF5QztBQUN6QyxtQ0FBcUM7QUFDckMscURBQXlDO0FBWXpDLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ3RCLE1BQU0sZ0JBQWdCO1FBSXJCO1lBSFEsU0FBSSxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBSTFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVPLGdCQUFnQjtZQUN2QixJQUFHLENBQUMsd0JBQU0sRUFBRTtnQkFDWCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3RTtRQUNGLENBQUM7UUFFTSxVQUFVLENBQUMsSUFBWTtZQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksUUFBUSxFQUFFO2dCQUNiLE9BQU8sUUFBUSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNOLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0YsQ0FBQztRQUVNLEtBQUs7WUFDWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVNLGVBQWUsQ0FBQyxJQUFZLEVBQUUsRUFBTyxFQUFFLE9BQXNCLEVBQUU7WUFDckUsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwQixJQUFJLGtCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ25CLElBQUksUUFBUSxHQUFHLHNCQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ25CO2lCQUNEO2FBQ0Q7aUJBQU07Z0JBQ04sTUFBTSx3REFBd0QsQ0FBQzthQUMvRDtRQUNGLENBQUM7S0FDRDtJQUVELE1BQU0sZ0JBQWdCLEdBQWMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0lBRTNELE9BQU87UUFDTixRQUFRLEVBQUUsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRSxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztLQUNwRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVJLDRCQUFRIn0=