"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var service_resolver_1 = require("./service_resolver");
var utils_1 = require("./utils");
var router_1 = tslib_1.__importDefault(require("./router"));
var StaticRouter = (function () {
    function StaticRouter() {
    }
    StaticRouter.checkParams = function (up, r) {
        var pmc = 0, po = {}, pc = r.ParamCount;
        for (var i = 0; i < up.length; i++) {
            var rtParam = r.Params[i];
            if (rtParam.indexOf(":") >= 0) {
                po[rtParam.split(":")[1]] = up[i];
                pmc += 1;
            }
        }
        if (pmc === pc) {
            return po;
        }
        return false;
    };
    StaticRouter.getParamCount = function (p) {
        var pc = 0;
        p.forEach(function (k) {
            if (k.indexOf(":") >= 0) {
                pc += 1;
            }
        });
        return pc;
    };
    StaticRouter.formatRoute = function (r) {
        var obj = {
            Params: {},
            Url: "",
            Template: "",
            TemplatePath: '',
            ParamCount: 0,
            IsRegistered: false
        };
        obj.Params = r.path.split("/").filter(function (h) {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
        if (r.template) {
            if (!r.templatePath)
                throw Error('templatePath is required in route if template is mentioned.');
            obj.Template = r.template;
            obj.TemplatePath = r.templatePath;
        }
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        return obj;
    };
    return StaticRouter;
}());
var InternalRouter = (function () {
    function InternalRouter() {
        this.currentRoute = {
            params: {}
        };
        this.routeList = [];
        this.currentPage = "";
        this.previousPage = "";
        this.outletFn = function () { };
    }
    InternalRouter.prototype._navigateTo = function (path) {
        if (this.currentPage !== path) {
            this.previousPage = this.currentPage;
            this.currentPage = path;
            var uParams = path.split("/").filter(function (h) {
                return h.length > 0;
            });
            var isRouteFound = 0;
            for (var i = 0; i < this.routeList.length; i++) {
                if (isRouteFound === 0) {
                    var routeItem = this.routeList[i];
                    if (routeItem.Params.length === uParams.length) {
                        var _params = StaticRouter.checkParams(uParams, routeItem);
                        if (_params &&
                            (Object.keys(_params).length > 0 || path === routeItem.Url)) {
                            isRouteFound += 1;
                            this.currentRoute.params = _params;
                            if (!routeItem.IsRegistered) {
                                routeItem.TemplatePath && require('src/' + routeItem.TemplatePath);
                                routeItem.IsRegistered = true;
                            }
                            this.outletFn && this.outletFn(routeItem.Template);
                            break;
                        }
                    }
                }
            }
        }
    };
    InternalRouter.prototype.addRoutes = function (routes) {
        if (utils_1.isArray(routes)) {
            var redirectRoute = null;
            for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                var route = routes_1[_i];
                this.routeList.push(StaticRouter.formatRoute(route));
                if (route.redirectTo) {
                    redirectRoute = route;
                }
            }
            if (redirectRoute) {
                this.navigateTo(redirectRoute.redirectTo);
            }
        }
        else {
            throw Error("router.addRoutes: the parameter must be an array");
        }
    };
    InternalRouter.prototype.getCurrentRoute = function () {
        return this.currentRoute;
    };
    InternalRouter.prototype.navigateTo = function (path) {
        if (path === void 0) { path = ""; }
        window.history.pushState(null, '', path);
        this._navigateTo(path);
    };
    InternalRouter.prototype.setOutletFn = function (fn) {
        this.outletFn = fn;
    };
    InternalRouter.prototype.onNavigationStart = function (cb) {
        if (cb && utils_1.isFunction(cb)) {
            window.addEventListener("hashchange", cb, false);
        }
    };
    return InternalRouter;
}());
exports.InternalRouter = InternalRouter;
var Router = (function () {
    function Router(_getCurrentRoute, _navigateTo, _onNavigationStart) {
        this.getCurrentRoute = function () { };
        this.navigateTo = function () { };
        this.onNavigationStart = function () { };
        router_1.default();
        this.getCurrentRoute = _getCurrentRoute;
        this.navigateTo = _navigateTo;
        this.onNavigationStart = _onNavigationStart;
    }
    return Router;
}());
exports.Router = Router;
var _internalRouter = new InternalRouter();
service_resolver_1.Injector.register("InternalRouter", _internalRouter);
service_resolver_1.Injector.register("Router", new Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBOEM7QUFDOUMsaUNBQThDO0FBRTlDLDREQUErQztBQU8vQztJQUFBO0lBbURBLENBQUM7SUFsRE8sd0JBQVcsR0FBbEIsVUFBbUIsRUFBaUIsRUFBRSxDQUFZO1FBQ2pELElBQUksR0FBRyxHQUFHLENBQUMsRUFDVixFQUFFLEdBQVEsRUFBRSxFQUNaLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDVDtTQUNEO1FBQ0QsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVNLDBCQUFhLEdBQXBCLFVBQXFCLENBQU07UUFDMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQVM7WUFDbkIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNSO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFTSx3QkFBVyxHQUFsQixVQUFtQixDQUFRO1FBQzFCLElBQUksR0FBRyxHQUFzQjtZQUM1QixNQUFNLEVBQUUsRUFBRTtZQUNWLEdBQUcsRUFBRSxFQUFFO1lBQ1AsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsQ0FBQztZQUNiLFlBQVksRUFBRSxLQUFLO1NBQ25CLENBQUM7UUFDRixHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQVE7WUFDOUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqQixHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVk7Z0JBQUUsTUFBTSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQTtZQUM5RixHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDMUIsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ2xDO1FBQ0QsR0FBRyxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUFuREQsSUFtREM7QUFFRDtJQUFBO1FBQ0MsaUJBQVksR0FBRztZQUNkLE1BQU0sRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUNNLGNBQVMsR0FBNkIsRUFBRSxDQUFDO1FBQ3pDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBYSxjQUFPLENBQUMsQ0FBQztJQXFFdkMsQ0FBQztJQW5FUSxvQ0FBVyxHQUFuQixVQUFvQixJQUFZO1FBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQztnQkFDckMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFO3dCQUMvQyxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDM0QsSUFDQyxPQUFPOzRCQUNQLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQzFEOzRCQUNELFlBQVksSUFBSSxDQUFDLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQzs0QkFDbkMsSUFBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7Z0NBQzNCLFNBQVMsQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0NBQ2xFLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzZCQUM5Qjs0QkFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNuRCxNQUFNO3lCQUNOO3FCQUNEO2lCQUNEO2FBQ0Q7U0FDRDtJQUNGLENBQUM7SUFFRCxrQ0FBUyxHQUFULFVBQVUsTUFBb0I7UUFDN0IsSUFBSSxlQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLEtBQWtCLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTSxFQUFFO2dCQUFyQixJQUFJLEtBQUssZUFBQTtnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDckIsYUFBYSxHQUFHLEtBQUssQ0FBQztpQkFDdEI7YUFDRDtZQUNELElBQUksYUFBYSxFQUFFO2dCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQztTQUNEO2FBQU07WUFDTixNQUFNLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ2hFO0lBQ0QsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVGLG1DQUFVLEdBQVYsVUFBVyxJQUFpQjtRQUFqQixxQkFBQSxFQUFBLFNBQWlCO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLEVBQVk7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDBDQUFpQixHQUFqQixVQUFrQixFQUFPO1FBQ3hCLElBQUksRUFBRSxJQUFJLGtCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakQ7SUFDRixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBNUVELElBNEVDO0FBNUVZLHdDQUFjO0FBOEUzQjtJQUlDLGdCQUNDLGdCQUEwQixFQUMxQixXQUFxQixFQUNyQixrQkFBNEI7UUFON0Isb0JBQWUsR0FBWSxjQUFPLENBQUMsQ0FBQztRQUNwQyxlQUFVLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFDaEMsc0JBQWlCLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFNdEMsZ0JBQXVCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztJQUM1QyxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksd0JBQU07QUFnQm5CLElBQU0sZUFBZSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFFN0MsMkJBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDckQsMkJBQVEsQ0FBQyxRQUFRLENBQ2hCLFFBQVEsRUFDUixJQUFJLE1BQU0sQ0FDVCxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFDckQsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ2hELGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ3ZELENBQ0QsQ0FBQyJ9