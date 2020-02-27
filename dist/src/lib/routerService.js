"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
var utils_1 = require("./utils");
var router_1 = require("./router");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var browser_or_node_1 = require("browser-or-node");
function wrapIntoObservable(value) {
    return rxjs_1.from(Promise.resolve(value)).pipe(operators_1.mergeMap(function (t) {
        return rxjs_1.of(t);
    }));
}
var StaticRouter = /** @class */ (function () {
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
        return {};
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
            ParamCount: 0,
            IsRegistered: false,
            redirectTo: ""
        };
        obj.Params = r.path.split("/").filter(function (h) {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
        obj.redirectTo = r.redirectTo;
        if (r.template) {
            if (!r.templatePath)
                throw Error("templatePath is required in route if template is mentioned.");
            obj.Template = r.template;
            obj.TemplatePath = wrapIntoObservable(r.templatePath());
        }
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        StaticRouter.routList.push(obj);
    };
    StaticRouter.routList = [];
    return StaticRouter;
}());
var InternalRouter = /** @class */ (function () {
    function InternalRouter() {
        this.currentRoute = {
            params: {}
        };
        this.currentPage = "";
        this.previousPage = "";
        this.$templateSubscriber = new rxjs_1.Subject();
    }
    InternalRouter.prototype._navigateTo = function (path) {
        var _this = this;
        if (this.currentPage !== path) {
            this.previousPage = this.currentPage;
            this.currentPage = path;
            var uParams_1 = path.split("/").filter(function (h) {
                return h.length > 0;
            });
            var routeArr = StaticRouter.routList.filter(function (route) {
                if (route.Params.length === uParams_1.length) {
                    return route;
                }
                else if (route.Url === path) {
                    return route;
                }
            });
            var routeItem_1 = routeArr.length > 0 ? routeArr[0] : null;
            if (routeItem_1) {
                var _params = StaticRouter.checkParams(uParams_1, routeItem_1);
                if (Object.keys(_params).length > 0 || path) {
                    this.currentRoute.params = _params;
                    if (!routeItem_1.IsRegistered) {
                        if (routeItem_1.TemplatePath) {
                            routeItem_1.TemplatePath.subscribe(function (res) {
                                routeItem_1.IsRegistered = true;
                                window.history.pushState(null, "", path);
                                _this.$templateSubscriber.next(routeItem_1.Template);
                            });
                        }
                    }
                    else {
                        window.history.pushState(null, "", path);
                        this.$templateSubscriber.next(routeItem_1.Template);
                    }
                }
                else {
                    this._navigateTo(routeItem_1.redirectTo);
                }
            }
        }
    };
    InternalRouter.prototype.getCurrentRoute = function () {
        return this.currentRoute;
    };
    InternalRouter.prototype.navigateTo = function (path) {
        if (path === void 0) { path = ""; }
        this._navigateTo(path);
    };
    InternalRouter.prototype.onNavigationStart = function (cb) {
        if (cb && utils_1.isFunction(cb)) {
            window.addEventListener("hashchange", cb, false);
        }
    };
    return InternalRouter;
}());
exports.InternalRouter = InternalRouter;
var Router = /** @class */ (function () {
    function Router(_getCurrentRoute, _navigateTo, _onNavigationStart) {
        router_1.registerRouterComponent();
        this.getCurrentRoute = _getCurrentRoute;
        this.navigateTo = _navigateTo;
        this.onNavigationStart = _onNavigationStart;
    }
    Router.registerRoutes = function (routes) {
        if (!browser_or_node_1.isNode) {
            if (utils_1.isArray(routes)) {
                for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                    var route = routes_1[_i];
                    StaticRouter.formatRoute(route);
                }
            }
            else {
                throw Error("router.addRoutes: the parameter must be an array");
            }
        }
    };
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdIQUFnSDtBQUNoSCxpQ0FBOEM7QUFFOUMsbUNBQW1EO0FBQ25ELDZCQUFxRDtBQUNyRCw0Q0FBMEM7QUFDMUMsbURBQXlDO0FBWXpDLFNBQVMsa0JBQWtCLENBQUMsS0FBbUI7SUFDOUMsT0FBTyxXQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdkMsb0JBQVEsQ0FBQyxVQUFDLENBQU07UUFDZixPQUFPLFNBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUNGLENBQUM7QUFDSCxDQUFDO0FBRUQ7SUFBQTtJQXdEQSxDQUFDO0lBdERPLHdCQUFXLEdBQWxCLFVBQW1CLEVBQWlCLEVBQUUsQ0FBWTtRQUNqRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQ1YsRUFBRSxHQUFlLEVBQUUsRUFDbkIsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNUO1NBQ0Q7UUFDRCxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFD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