import { Route } from "./types";
interface ICurrentRoute {
    params: {
        [key: string]: string | number | boolean;
    };
}
export declare class InternalRouter {
    currentRoute: ICurrentRoute;
    private routeList;
    private currentPage;
    private previousPage;
    private outletFn;
    private _navigateTo;
    addRoutes(routes: Array<Route>): Promise<void>;
    getCurrentRoute(): ICurrentRoute;
    navigateTo(path?: string): void;
    setOutletFn(fn: Function): void;
    onNavigationStart(cb: any): void;
}
export declare class Router {
    getCurrentRoute: () => ICurrentRoute;
    navigateTo: () => void;
    onNavigationStart: () => void;
    constructor(_getCurrentRoute: () => ICurrentRoute, _navigateTo: () => void, _onNavigationStart: () => void);
}
export {};
