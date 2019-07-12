declare type DecoratorOptions = {
    selector: string;
};
declare type RouteItem = {
    Params: any;
    Url: string;
    Template: string;
    ParamCount: number;
};
declare type Route = {
    path: string;
    template?: string;
    redirectTo?: string;
};
