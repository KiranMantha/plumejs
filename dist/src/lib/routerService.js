import { isFunction, isArray } from "./utils";
import { registerRouterComponent } from "./router";
import { Subject, from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
function wrapIntoObservable(value) {
    return from(Promise.resolve(value)).pipe(mergeMap((t) => {
        return of(t);
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
            obj.TemplatePath = wrapIntoObservable(r.templatePath());
        }
        obj.ParamCount = StaticRouter.getParamCount(obj.Params);
        StaticRouter.routList.push(obj);
    }
}
StaticRouter.routList = [];
export class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
        this.currentPage = '';
        this.previousPage = "";
        this.$templateSubscriber = new Subject();
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
                            routeItem.TemplatePath.subscribe((res) => {
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
    static registerRoutes(routes) {
        if (isArray(routes)) {
            for (let route of routes) {
                StaticRouter.formatRoute(route);
            }
        }
        else {
            throw Error("router.addRoutes: the parameter must be an array");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUU5QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBYyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQTtBQVl2QyxTQUFTLGtCQUFrQixDQUFDLEtBQWtCO0lBQzdDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBSyxFQUFFLEVBQUU7UUFDM0QsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sWUFBWTtJQUVqQixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQWlCLEVBQUUsQ0FBWTtRQUNqRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQ1YsRUFBRSxHQUFlLEVBQUUsRUFDbkIsRUFBRSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENB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