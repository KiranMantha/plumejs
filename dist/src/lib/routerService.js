"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
const utils_1 = require("./utils");
const router_1 = require("./router");
const rxjs_1 = require("rxjs");
class StaticRouter {
    static checkParams(up, r) {
        let pmc = 0, po = {}, pc = r.ParamCount;
        for (let i = 0; i < up.length; i++) {
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
    }
    static getParamCount(p) {
        let pc = 0;
        p.forEach((k) => {
            if (k.indexOf(":") >= 0) {
                pc += 1;
            }
        });
        return pc;
    }
    static formatRoute(r) {
        let obj = {
            Params: {},
            Url: "",
            Template: "",
            TemplatePath: "",
            ParamCount: 0,
            IsRegistered: false,
            redirectTo: ""
        };
        obj.Params = r.path.split("/").filter((h) => {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
        obj.redirectTo = r.redirectTo;
        if (r.template) {
            if (!r.templatePath)
                throw Error("templatePath is required in route if template is mentioned.");
            obj.Template = r.template;
            obj.TemplatePath = r.templatePath;
        }
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        return obj;
    }
}
class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
        this.routeList = [];
        this.currentPage = null;
        this.previousPage = "";
        this.$templateSubscriber = new rxjs_1.Subject();
    }
    _navigateTo(path) {
        if (this.currentPage !== path) {
            this.previousPage = this.currentPage;
            this.currentPage = path;
            let uParams = path.split("/").filter(h => {
                return h.length > 0;
            });
            let routeArr = this.routeList.filter(route => {
                if (route.Params.length === uParams.length) {
                    return route;
                }
                else if (route.Url === path) {
                    return route;
                }
            });
            let routeItem = routeArr.length > 0 ? routeArr[0] : null;
            if (routeItem) {
                let _params = StaticRouter.checkParams(uParams, routeItem);
                if (_params &&
                    (Object.keys(_params).length > 0 || path)) {
                    this.currentRoute.params = _params;
                    if (!routeItem.IsRegistered) {
                        if (routeItem.TemplatePath) {
                            Promise.resolve().then(() => __importStar(require(/* webpackMode: "lazy-once" */ `src/${routeItem.TemplatePath}`))).then(() => {
                                window.history.pushState(null, "", path);
                                this.$templateSubscriber.next(routeItem.Template);
                            });
                        }
                        routeItem.IsRegistered = true;
                    }
                    else {
                        window.history.pushState(null, "", path);
                        this.$templateSubscriber.next(routeItem.Template);
                    }
                }
                else {
                    this._navigateTo(routeItem.redirectTo);
                }
            }
        }
    }
    addRoutes(routes) {
        if (utils_1.isArray(routes)) {
            for (let route of routes) {
                this.routeList.push(StaticRouter.formatRoute(route));
            }
        }
        else {
            throw Error("router.addRoutes: the parameter must be an array");
        }
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    navigateTo(path = "") {
        this._navigateTo(path);
    }
    onNavigationStart(cb) {
        if (cb && utils_1.isFunction(cb)) {
            window.addEventListener("hashchange", cb, false);
        }
    }
}
exports.InternalRouter = InternalRouter;
class Router {
    constructor(_getCurrentRoute, _navigateTo, _onNavigationStart) {
        router_1.registerRouterComponent();
        this.getCurrentRoute = _getCurrentRoute;
        this.navigateTo = _navigateTo;
        this.onNavigationStart = _onNavigationStart;
    }
}
exports.Router = Router;
const _internalRouter = new InternalRouter();
service_resolver_1.Injector.register("InternalRouter", _internalRouter);
service_resolver_1.Injector.register("Router", new Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5REFBOEM7QUFDOUMsbUNBQThDO0FBRTlDLHFDQUFtRDtBQUNuRCwrQkFBK0I7QUFZL0IsTUFBTSxZQUFZO0lBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBaUIsRUFBRSxDQUFZO1FBQ2pELElBQUksR0FBRyxHQUFHLENBQUMsRUFDVixFQUFFLEdBQWUsRUFBRSxFQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Q7U0FDRDtRQUNELElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQVc7UUFDL0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7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