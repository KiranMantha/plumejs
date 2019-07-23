"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_resolver_1 = require("./service_resolver");
var utils_1 = require("./utils");
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
            ParamCount: 0
        };
        obj.Params = r.path.split("/").filter(function (h) {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
        if (r.template) {
            obj.Template = r.template;
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
//# sourceMappingURL=routerService.js.map