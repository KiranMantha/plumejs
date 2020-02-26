interface DecoratorOptions {
    selector: string;
    styleUrl?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface RouteItem {
    Params: any;
    Url: string;
    Template: string;
    ParamCount: number;
}
interface Route {
    path: string;
    template?: string;
    templatePath?: () => Promise<any>;
    redirectTo?: string;
    canActivate?: () => boolean;
}
declare type Ref<T> = {
    current: T;
};
declare type jsonObject = {
    [index: string]: any;
};
export { DecoratorOptions, RouteItem, Route, Ref, jsonObject };
