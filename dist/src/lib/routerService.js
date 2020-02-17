//https://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
import { isFunction, isArray } from "./utils";
import { registerRouterComponent } from "./router";
import { Subject } from 'rxjs';
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
export class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
        this.routeList = [];
        this.currentPage = null;
        this.previousPage = "";
        this.$templateSubscriber = new Subject();
    }
    async _navigateTo(path) {
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
                if (Object.keys(_params).length > 0 || path) {
                    this.currentRoute.params = _params;
                    if (!routeItem.IsRegistered) {
                        if (routeItem.TemplatePath) {
                            await import(`src/${routeItem.TemplatePath}`);
                            window.history.pushState(null, "", path);
                            this.$templateSubscriber.next(routeItem.Template);
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
        if (isArray(routes)) {
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
        if (cb && isFunction(cb)) {
            window.addEventListener("hashchange", cb, false);
        }
    }
}
export class Router {
    constructor(_getCurrentRoute, _navigateTo, _onNavigationStart) {
        registerRouterComponent();
        this.getCurrentRoute = _getCurrentRoute;
        this.navigateTo = _navigateTo;
        this.onNavigationStart = _onNavigationStart;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnSEFBZ0g7QUFDaEgsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFOUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFZL0IsTUFBTSxZQUFZO0lBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBaUIsRUFBRSxDQUFZO1FBQ2pELElBQUksR0FBRyxHQUFHLENBQUMsRUFDVixFQUFFLEdBQWUsRUFBRSxFQUNuQixFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Q7U0FDRDtRQUNELElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQVc7UUFDL0IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFD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