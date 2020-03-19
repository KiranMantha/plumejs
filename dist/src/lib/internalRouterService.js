"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const staticRouter_1 = require("./staticRouter");
const utils_1 = require("./utils");
const decorators_1 = require("./decorators");
function wrapIntoObservable(value) {
    return rxjs_1.from(Promise.resolve(value)).pipe(operators_1.mergeMap((t) => {
        return rxjs_1.of(t);
    }));
}
let InternalRouter = class InternalRouter {
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
            let routeArr = staticRouter_1.StaticRouter.routList.filter(route => {
                if (route.Params.length === uParams.length) {
                    return route;
                }
                else if (route.Url === path) {
                    return route;
                }
            });
            let routeItem = routeArr.length > 0 ? routeArr[0] : null;
            if (routeItem) {
                let _params = staticRouter_1.StaticRouter.checkParams(uParams, routeItem);
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
};
InternalRouter = tslib_1.__decorate([
    decorators_1.Injectable()
], InternalRouter);
exports.InternalRouter = InternalRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWxSb3V0ZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnRlcm5hbFJvdXRlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQXFEO0FBQ3JELDhDQUEwQztBQUMxQyxpREFBOEM7QUFDOUMsbUNBQXFDO0FBQ3JDLDZDQUEwQztBQUUxQyxTQUFTLGtCQUFrQixDQUFDLEtBQW1CO0lBQzlDLE9BQU8sV0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3ZDLG9CQUFRLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUNuQixPQUFPLFNBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUNGLENBQUM7QUFDSCxDQUFDO0FBR0QsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUEzQjtRQUNDLGlCQUFZLEdBQWtCO1lBQzdCLE1BQU0sRUFBRSxFQUFFO1NBQ1YsQ0FBQztRQUNNLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7SUFxRHJDLENBQUM7SUFuRFEsV0FBVyxDQUFDLElBQVk7UUFDL0IsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVEsR0FBRywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDM0MsT0FBTyxLQUFLLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRTtvQkFDOUIsT0FBTyxLQUFLLENBQUM7aUJBQ2I7WUFDRixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN6RCxJQUFJLFNBQVMsRUFBRTtnQkFDZCxJQUFJLE9BQU8sR0FBRywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO29CQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTt3QkFDNUIsSUFBSSxTQUFTLENBQUMsWUFBWSxFQUFFOzRCQUMzQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQ0FDbkUsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0NBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNuRCxDQUFDLENBQUMsQ0FBQzt5QkFDSDtxQkFDRDt5QkFBTTt3QkFDTixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEQ7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Q7U0FDRDtJQUNGLENBQUM7SUFFRCxlQUFlO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBZSxFQUFFO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDeEIsSUFBSSxFQUFFLElBQUksa0JBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqRDtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBM0RZLGNBQWM7SUFEMUIsdUJBQVUsRUFBRTtHQUNBLGNBQWMsQ0EyRDFCO0FBM0RZLHdDQUFjIn0=