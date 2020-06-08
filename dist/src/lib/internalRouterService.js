"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const staticRouter_1 = require("./router/staticRouter");
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
