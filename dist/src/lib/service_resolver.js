"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = require("./instance");
var utils_1 = require("./utils");
var translationService_1 = require("./translationService");
var routerService_1 = require("./routerService");
var browser_or_node_1 = require("browser-or-node");
var Injector = (function () {
    var InternalInjector = /** @class */ (function () {
        function InternalInjector() {
            this._map = new Map();
            this.get = this._map.get.bind(this._map);
            this.set = this._map.set.bind(this._map);
            this._defaultServices();
        }
        InternalInjector.prototype._defaultServices = function () {
            if (!browser_or_node_1.isNode) {
                var compiledCSSObj = JSON.parse(JSON.stringify(process.env.COMPILEDCSSOBJ));
                this.registerService("COMPILEDCSS", new Map(Object.entries(compiledCSSObj)));
            }
            this.registerService("TranslationService", new translationService_1.TranslationService());
            var _internalRouter = new routerService_1.InternalRouter();
            this.registerService("InternalRouter", _internalRouter);
            this.registerService("Router", new routerService_1.Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
        };
        InternalInjector.prototype.getService = function (name) {
            var instance = this.get(name);
            if (instance) {
                return instance;
            }
            else {
                throw Error(name + " is not a registered provider.");
            }
        };
        InternalInjector.prototype.clear = function () {
            this._map = new Map();
        };
        InternalInjector.prototype.registerService = function (name, fn, deps) {
            if (deps === void 0) { deps = []; }
            if (name && fn) {
                if (!this.get(name)) {
                    if (utils_1.isFunction(fn)) {
                        var instance = instance_1.instantiate(fn, deps);
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
        };
        return InternalInjector;
    }());
    var injectorInstance = new InternalInjector();
    return {
        register: injectorInstance.registerService.bind(injectorInstance),
        get: injectorInstance.getService.bind(injectorInstance),
        clear: injectorInstance.clear.bind(injectorInstance)
    };
})();
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUN6QyxpQ0FBcUM7QUFDckMsMkRBQTBEO0FBQzFELGlEQUF5RDtBQUN6RCxtREFBeUM7QUFZekMsSUFBTSxRQUFRLEdBQUcsQ0FBQztJQUNqQjtRQUlDO1lBSFEsU0FBSSxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFDO1lBSTFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVPLDJDQUFnQixHQUF4QjtZQUNDLElBQUcsQ0FBQyx3QkFBTSxFQUFFO2dCQUNYLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLHVDQUFrQixFQUFFLENBQUMsQ0FBQztZQUNyRSxJQUFNLGVBQWUsR0FBRyxJQUFJLDhCQUFjLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQ25CLFFBQVEsRUFDUixJQUFJLHNCQUFNLENBQ1QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3JELGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNoRCxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUN2RCxDQUNELENBQUM7UUFDSCxDQUFDO1FBRU0scUNBQVUsR0FBakIsVUFBa0IsSUFBWTtZQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksUUFBUSxFQUFFO2dCQUNiLE9BQU8sUUFBUSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNOLE1BQU0sS0FBSyxDQUFJLElBQUksbUNBQWdDLENBQUMsQ0FBQzthQUNyRDtRQUNGLENBQUM7UUFFTSxnQ0FBSyxHQUFaO1lBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFTSwwQ0FBZSxHQUF0QixVQUF1QixJQUFZLEVBQUUsRUFBTyxFQUFFLElBQXdCO1lBQXhCLHFCQUFBLEVBQUEsU0FBd0I7WUFDckUsSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwQixJQUFJLGtCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ25CLElBQUksUUFBUSxHQUFHLHNCQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ25CO2lCQUNEO2FBQ0Q7aUJBQU07Z0JBQ04sTUFBTSx3REFBd0QsQ0FBQzthQUMvRDtRQUNGLENBQUM7UUFDRix1QkFBQztJQUFELENBQUMsQUF2REQsSUF1REM7SUFFRCxJQUFNLGdCQUFnQixHQUFjLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztJQUUzRCxPQUFPO1FBQ04sUUFBUSxFQUFFLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDcEQsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFSSw0QkFBUSJ9