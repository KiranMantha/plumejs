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
        return __awaiter(this, void 0, void 0, function* () {
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
                                yield Promise.resolve().then(() => __importStar(require(`src/${routeItem.TemplatePath}`)));
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
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEM7QUFFOUMscUNBQW1EO0FBQ25ELCtCQUErQjtBQVkvQixNQUFNLFlBQVk7SUFDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFpQixFQUFFLENBQVk7UUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUNWLEVBQUUsR0FBZSxFQUFFLEVBQ25CLEVBQUUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDVDtTQUNEO1FBQ0QsSUFBSSxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBVztRQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFD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