"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
const utils_1 = require("./utils");
const router_1 = __importDefault(require("./router"));
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
            TemplatePath: '',
            ParamCount: 0,
            IsRegistered: false
        };
        obj.Params = r.path.split("/").filter((h) => {
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
    }
}
class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
        this.routeList = [];
        this.currentPage = "";
        this.previousPage = "";
        this.outletFn = () => { };
    }
    _navigateTo(path) {
        if (this.currentPage !== path) {
            this.previousPage = this.currentPage;
            this.currentPage = path;
            let uParams = path.split("/").filter(h => {
                return h.length > 0;
            });
            let isRouteFound = 0;
            for (let i = 0; i < this.routeList.length; i++) {
                if (isRouteFound === 0) {
                    let routeItem = this.routeList[i];
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
    }
    addRoutes(routes) {
        if (utils_1.isArray(routes)) {
            let redirectRoute = null;
            for (let route of routes) {
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
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    navigateTo(path = "") {
        window.history.pushState(null, '', path);
        this._navigateTo(path);
    }
    setOutletFn(fn) {
        this.outletFn = fn;
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
        this.getCurrentRoute = () => { };
        this.navigateTo = () => { };
        this.onNavigationStart = () => { };
        router_1.default();
        this.getCurrentRoute = _getCurrentRoute;
        this.navigateTo = _navigateTo;
        this.onNavigationStart = _onNavigationStart;
    }
}
exports.Router = Router;
const _internalRouter = new InternalRouter();
service_resolver_1.Injector.register("InternalRouter", _internalRouter);
service_resolver_1.Injector.register("Router", new Router(_internalRouter.getCurrentRoute.bind(_internalRouter), _internalRouter.navigateTo.bind(_internalRouter), _internalRouter.onNavigationStart.bind(_internalRouter)));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlEQUE4QztBQUM5QyxtQ0FBOEM7QUFFOUMsc0RBQStDO0FBTy9DLE1BQU0sWUFBWTtJQUNqQixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQWlCLEVBQUUsQ0FBWTtRQUNqRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQ1YsRUFBRSxHQUFRLEVBQUUsRUFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Q7U0FDRDtRQUNELElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQU07UUFDMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLEVBQUUsSUFBSSxD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