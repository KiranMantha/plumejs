"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../utils");
const browser_or_node_1 = require("browser-or-node");
const staticRouter_1 = require("./staticRouter");
const decorators_1 = require("../decorators");
const internalRouterService_1 = require("../internalRouterService");
let Router = class Router {
    constructor(internalRouter) {
        this.getCurrentRoute = internalRouter.getCurrentRoute.bind(internalRouter);
        this.navigateTo = internalRouter.navigateTo.bind(internalRouter);
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
