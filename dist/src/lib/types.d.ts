export declare type DecoratorOptions = {
    selector: string;
};
export declare type RouteItem = {
    Params: any;
    Url: string;
    Template: string;
    ParamCount: number;
};
export declare type Route = {
    path: string;
    template?: string;
    redirectTo?: string;
};
