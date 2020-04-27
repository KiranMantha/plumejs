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
            params: {},
        };
        this.$templateSubscriber = new rxjs_1.Subject();
        window.addEventListener("hashchange", () => {
            this._registerOnHashChange();
        }, false);
    }
    _registerOnHashChange() {
        const path = window.location.hash.replace(/^#/, "");
        this._navigateTo(path);
    }
    _routeMatcher(route, path) {
        if (route) {
            let _matcher = new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)"));
            return path.match(_matcher);
        }
        else {
            return route === path;
        }
    }
    _navigateTo(path) {
        let uParams = path.split("/").filter((h) => {
            return h.length > 0;
        });
        let routeArr = staticRouter_1.StaticRouter.routList.filter((route) => {
            if (route.Params.length === uParams.length &&
                this._routeMatcher(route.Url, path)) {
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
    getCurrentRoute() {
        return this.currentRoute;
    }
    navigateTo(path = "") {
        if (path) {
            let windowHash = window.location.hash.replace(/^#/, "");
            if (windowHash === path) {
                this._navigateTo(path);
            }
            window.location.hash = "#" + path;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxSb3V0ZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnRlcm5hbFJvdXRlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQStCO0FBQy9CLGlEQUE4QztBQUM5QyxtQ0FBNkM7QUFDN0MsNkNBQTBDO0FBRzFDLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFNMUI7UUFMQSxpQkFBWSxHQUFrQjtZQUM3QixNQUFNLEVBQUUsRUFBRTtTQUNWLENBQUM7UUFDRix3QkFBbUIsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBR25DLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDdEIsWUFBWSxFQUNaLEdBQUcsRUFBRTtZQUNKLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlCLENBQUMsRUFDRCxLQUFLLENBQ0wsQ0FBQztJQUNILENBQUM7SUFFTyxxQkFBcUI7UUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxhQUFhLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ04sT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDO1NBQ3RCO0lBQ0YsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFZO1FBQy9CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFD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