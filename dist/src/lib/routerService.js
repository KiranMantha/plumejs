"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("./utils");
const router_1 = require("./router");
const browser_or_node_1 = require("browser-or-node");
const staticRouter_1 = require("./staticRouter");
const decorators_1 = require("./decorators");
const internalRouterService_1 = require("./internalRouterService");
let Router = class Router {
    constructor(internalRouter) {
        router_1.registerRouterComponent();
        this.getCurrentRoute = internalRouter.getCurrentRoute.bind(internalRouter);
        this.navigateTo = internalRouter.navigateTo.bind(internalRouter);
        this.onNavigationStart = internalRouter.onNavigationStart.bind(internalRouter);
    }
    static registerRoutes(routes) {
        if (!browser_or_node_1.isNode) {
            if (utils_1.isArray(routes)) {
                for (let route of routes) {
                    staticRouter_1.StaticRouter.formatRoute(route);
                }
            }
            else {
                throw Error("router.addRoutes: the parameter must be an array");
            }
        }
    }
};
Router = tslib_1.__decorate([
    decorators_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [internalRouterService_1.InternalRouter])
], Router);
exports.Router = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcm91dGVyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBa0M7QUFFbEMscUNBQW1EO0FBQ25ELHFEQUF5QztBQUN6QyxpREFBOEM7QUFDOUMsNkNBQTBDO0FBQzFDLG1FQUF5RDtBQUd6RCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBSWxCLFlBQVksY0FBOEI7UUFDekMsZ0NBQXVCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBb0I7UUFDekMsSUFBSSxDQUFDLHdCQUFNLEVBQUU7WUFDWixJQUFJLGVBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7b0JBQ3pCLDJCQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQzthQUNEO2lCQUFNO2dCQUNOLE1BQU0sS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7YUFDaEU7U0FDRDtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBckJZLE1BQU07SUFEbEIsdUJBQVUsRUFBRTs2Q0FLZ0Isc0NBQWM7R0FKOUIsTUFBTSxDQXFCbEI7QUFyQlksd0JBQU0ifQ==