"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            IsRegistered: false
        };
        obj.Params = r.path.split("/").filter((h) => {
            return h.length > 0;
        });
        obj.Url = r.path;
        obj.Template = "";
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
                                if (routeItem.TemplatePath) {
                                    Promise.resolve().then(() => __importStar(require(
                                    /* webpackMode: "lazy-once" */
                                    `src/${routeItem.TemplatePath}`))).then(() => {
                                        this.outletFn && this.outletFn(routeItem.Template);
                                    });
                                }
                                routeItem.IsRegistered = true;
                            }
                            else {
                                this.outletFn && this.outletFn(routeItem.Template);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    addRoutes(routes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.isArray(routes)) {
                let redirectRoute = null;
                for (let route of routes) {
                    this.routeList.push(StaticRouter.formatRoute(route));
                    if (route.redirectTo) {
                        redirectRoute = route;
                    }
                }
                if (redirectRoute && window.location.pathname === '/') {
                    this.navigateTo(redirectRoute.redirectTo);
                }
                else {
                    this.navigateTo(window.location.pathname);
                }
            }
            else {
                throw Error("router.addRoutes: the parameter must be an array");
            }
        });
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    navigateTo(path = "") {
        window.history.pushState(null, "", path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBOEM7QUFDOUMsbUNBQThDO0FBRTlDLHFDQUFtRDtBQVduRCxNQUFNLFlBQVk7SUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFpQixFQUFFLENBQVk7UUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUNWLEVBQUUsR0FBZSxFQUFFLEVBQ25CLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDVDtTQUNEO1FBQ0QsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBVztRQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFD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