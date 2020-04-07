import { ICurrentRoute } from "./types";
import { Subject } from "rxjs";
export declare class InternalRouter {
    currentRoute: ICurrentRoute;
    private currentPage;
    private previousPage;
    $templateSubscriber: Subject<unknown>;
    constructor();
    private _registerOnHashChange;
    private _routeMatcher;
    private _navigateTo;
    getCurrentRoute(): ICurrentRoute;
    navigateTo(path?: string): void;
}
