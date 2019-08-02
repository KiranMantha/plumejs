export interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
}
export interface RouteItem {
    Params: any;
    Url: string;
    Template: string;
    ParamCount: number;
}
export interface Route {
    path: string;
    template?: string;
    redirectTo?: string;
}
export declare type Ref<T> = {
    current: T;
};
