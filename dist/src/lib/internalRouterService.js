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
        window.addEventListener("hashchange", () => {
            this._registerOnHashChange();
        }, false);
    }
    _registerOnHashChange() {
        const path = window.location.hash.replace(/^#/, '');
        this._navigateTo(path);
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
                                    this.$templateSubscriber.next(routeItem.Template);
                                });
                            }
                        }
                        else {
                            this.$templateSubscriber.next(routeItem.Template);
                        }
                    }
                    else {
                        this.navigateTo(routeItem.redirectTo);
                    }
                });
            }
        }
    }
    getCurrentRoute() {
        return this.currentRoute;
    }
    navigateTo(path = "") {
        if (path) {
            let windowHash = window.location.hash.replace(/^#/, '');
            if (windowHash === path) {
                this._navigateTo(path);
            }
            window.location.hash = '#' + path;
        }
        else {
            this._navigateTo(path);
        }
    }
};
InternalRouter = tslib_1.__decorate([
    decorators_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], InternalRouter);
exports.InternalRouter = InternalRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxSb3V0ZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnRlcm5hbFJvdXRlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQStCO0FBQy9CLGlEQUE4QztBQUM5QyxtQ0FBeUQ7QUFDekQsNkNBQTBDO0FBRzFDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFRMUI7UUFQQSxpQkFBWSxHQUFrQjtZQUM3QixNQUFNLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDTSxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBR25DLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTyxxQkFBcUI7UUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxhQUFhLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ04sT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDO1NBQ3RCO0lBQ0YsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJ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