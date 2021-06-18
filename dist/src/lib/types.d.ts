interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface IHooks {
    readonly ObservedProperties?: any;
    beforeMount?(): any;
    mount?(): any;
    unmount?(): any;
    onPropsChanged?(): any;
}
interface Renderer {
    update(): any;
    emitEvent(eventName: string, data?: any): any;
}
interface ComponentRef<T> {
    setProps(propertiesObject: {
        [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
    }): void;
    getInstance(): T;
}
declare type jsonObject = {
    [index: string]: any;
};
export { DecoratorOptions, IHooks, jsonObject, Renderer, ComponentRef };
