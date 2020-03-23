"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const staticRouter_1 = require("./staticRouter");
const utils_1 = require("./utils");
const decorators_1 = require("./decorators");
let InternalRouter = class InternalRouter {
    constructor() {
        this.currentRoute = {
            params: {}
        };
        this.currentPage = null;
        this.previousPage = "";
        this.$templateSubscriber = new rxjs_1.Subject();
    }
    _routeMatcher(route, path) {
        if (route) {
            let _matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
            return path.match(_matcher);
        }
        else {
            return route === path;
        }
    }
    _navigateTo(path) {
        if (this.currentPage !== path) {
            this.previousPage = this.currentPage;
            this.currentPage = path;
            let uParams = path.split("/").filter(h => {
                return h.length > 0;
            });
            let routeArr = staticRouter_1.StaticRouter.routList.filter(route => {
                if (route.Params.length === uParams.length && this._routeMatcher(route.Url, path)) {
                    return route;
                }
                else if (route.Url === path) {
                    return route;
                }
            });
            let routeItem = routeArr.length > 0 ? routeArr[0] : null;
            if (routeItem) {
                utils_1.wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
                    if (!val)
                        return;
                    let _params = staticRouter_1.StaticRouter.checkParams(uParams, routeItem);
                    if (Object.keys(_params).length > 0 || path) {
                        this.currentRoute.params = _params;
                        if (!routeItem.IsRegistered) {
                            if (routeItem.TemplatePath) {
                                utils_1.wrapIntoObservable(routeItem.TemplatePath()).subscribe((res) => {
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
                });
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
};
InternalRouter = tslib_1.__decorate([
    decorators_1.Injectable()
], InternalRouter);
exports.InternalRouter = InternalRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxSb3V0ZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnRlcm5hbFJvdXRlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQStCO0FBQy9CLGlEQUE4QztBQUM5QyxtQ0FBeUQ7QUFDekQsNkNBQTBDO0FBRzFDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFBM0I7UUFDQyxpQkFBWSxHQUFrQjtZQUM3QixNQUFNLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDTSxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO0lBaUVyQyxDQUFDO0lBL0RRLGFBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBWTtRQUNoRCxJQUFJLEtBQUssRUFBRTtZQUNWLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTixPQUFPLEtBQUssS0FBSyxJQUFJLENBQUM7U0FDdEI7SUFDRixDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVk7UUFDL0IsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FB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