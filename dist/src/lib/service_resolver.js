"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = require("./instance");
var utils_1 = require("./utils");
var Injector = (function () {
    var InternalInjector = (function () {
        function InternalInjector() {
            var _map = new Map();
            this.get = _map.get.bind(_map);
            this.set = _map.set.bind(_map);
        }
        InternalInjector.prototype.getService = function (name) {
            var instance = this.get(name);
            if (instance) {
                return instance;
            }
            else {
                throw Error(name + " is not a registered provider.");
            }
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
        get: injectorInstance.getService.bind(injectorInstance)
    };
})();
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2VydmljZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUN6QyxpQ0FBcUM7QUFXckMsSUFBTSxRQUFRLEdBQUcsQ0FBQztJQUVqQjtRQUdDO1lBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVNLHFDQUFVLEdBQWpCLFVBQWtCLElBQVk7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFHLFFBQVEsRUFBRTtnQkFDWixPQUFPLFFBQVEsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTixNQUFNLEtBQUssQ0FBSSxJQUFJLG1DQUFnQyxDQUFDLENBQUM7YUFDckQ7UUFDRixDQUFDO1FBRU0sMENBQWUsR0FBdEIsVUFBdUIsSUFBUyxFQUFFLEVBQU8sRUFBRSxJQUF3QjtZQUF4QixxQkFBQSxFQUFBLFNBQXdCO1lBQ2xFLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsSUFBSSxrQkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixJQUFJLFFBQVEsR0FBRyxzQkFBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQjtpQkFDRDthQUNEO2lCQUFNO2dCQUNOLE1BQU0sd0RBQXdELENBQUM7YUFDL0Q7UUFDRixDQUFDO1FBQ0YsdUJBQUM7SUFBRCxDQUFDLEFBaENELElBZ0NDO0lBRUQsSUFBTSxnQkFBZ0IsR0FBYSxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFMUQsT0FBTztRQUNOLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0tBQ3ZELENBQUE7QUFDRixDQUFDLENBQUMsRUFBRSxDQUFDO0FBR0ksNEJBQVEifQ==