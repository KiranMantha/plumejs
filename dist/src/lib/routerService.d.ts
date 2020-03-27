import { Route, ICurrentRoute } from "./types";
import { InternalRouter } from './internalRouterService';
export declare class Router {
    getCurrentRoute: () => ICurrentRoute;
    navigateTo: (path: string) => void;
    constructor(internalRouter: InternalRouter);
    static registerRoutes(routes: Array<Route>): void;
}
