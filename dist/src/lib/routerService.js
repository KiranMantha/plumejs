"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
const utils_1 = require("./utils");
const router_1 = require("./router");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const browser_or_node_1 = require("browser-or-node");
function wrapIntoObservable(value) {
    return rxjs_1.from(Promise.resolve(value)).pipe(operators_1.mergeMap((t) => {
        return rxjs_1.of(t);
    }));
}
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
        return {};
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
            //obj.TemplatePath = wrapIntoObservable(r.templatePath());
            obj.TemplatePath = r.templatePath;
        }
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        StaticRouter.routList.push(obj);
    }
}
StaticRouter.routList = [];
class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
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
            let routeArr = StaticRouter.routList.filter(route => {
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
                if (Object.keys(_params).length > 0 || path) {
                    this.currentRoute.params = _params;
                    if (!routeItem.IsRegistered) {
                        if (routeItem.TemplatePath) {
                            wrapIntoObservable(routeItem.TemplatePath()).subscribe((res) => {
                                routeItem.IsRegistered = true;
                                window.history.pushState(null, "", path);
                                this.$templateSubscriber.next(routeItem.Template);
                            });
                        }
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
    static registerRoutes(routes) {
        if (!browser_or_node_1.isNode) {
            if (utils_1.isArray(routes)) {
                for (let route of routes) {
                    StaticRouter.formatRoute(route);
                }
            }
            else {
                throw Error("router.addRoutes: the parameter must be an array");
            }
        }
    }
}
exports.Router = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdIQUFnSDtBQUNoSCxtQ0FBOEM7QUFFOUMscUNBQW1EO0FBQ25ELCtCQUFxRDtBQUNyRCw4Q0FBMEM7QUFDMUMscURBQXlDO0FBWXpDLFNBQVMsa0JBQWtCLENBQUMsS0FBbUI7SUFDOUMsT0FBTyxXQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdkMsb0JBQVEsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ25CLE9BQU8sU0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQ0YsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLFlBQVk7SUFFakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFpQixFQUFFLENBQVk7UUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUNWLEVBQUUsR0FBZSxFQUFFLEVBQ25CLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDVDtTQUNEO1FBQ0QsSUFBSSxHQUFHLEtBQUssRUFBRSxF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