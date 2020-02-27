import { Route } from "./types";
import { Subject } from "rxjs";
interface ICurrentRoute {
    params: {
        [key: string]: string | number | boolean;
    };
}
export declare class InternalRouter {
    currentRoute: ICurrentRoute;
    private currentPage;
    private previousPage;
    $templateSubscriber: Subject<unknown>;
    private _navigateTo;
    getCurrentRoute(): ICurrentRoute;
    navigateTo(path?: string): void;
    onNavigationStart(cb: any): void;
}
export declare class Router {
    getCurrentRoute: () => ICurrentRoute;
    navigateTo: (path: string) => void;
    onNavigationStart: () => void;
    constructor(_getCurrentRoute: () => ICurrentRoute, _navigateTo: (path: string) => void, _onNavigationStart: () => void);
    static registerRoutes(routes: Array<Route>): void;
}
export {};
