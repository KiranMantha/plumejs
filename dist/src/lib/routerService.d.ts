import { Route } from "./types";
export declare class InternalRouter {
    currentRoute: {
        params: {};
    };
    private routeList;
    private currentPage;
    private previousPage;
    private outletFn;
    private _navigateTo;
    addRoutes(routes: Array<Route>): void;
    getCurrentRoute(): {
        params: {};
    };
    navigateTo(path?: string): Promise<void>;
    setOutletFn(fn: Function): void;
    onNavigationStart(cb: any): void;
}
export declare class Router {
    getCurrentRoute: Function;
    navigateTo: Function;
    onNavigationStart: Function;
    constructor(_getCurrentRoute: Function, _navigateTo: Function, _onNavigationStart: Function);
}
