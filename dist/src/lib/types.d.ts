interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface IHooks {
    beforeMount?(): any;
    mount?(): any;
    unmount?(): any;
    onPropsChanged?(): any;
}
interface Renderer {
    update(): any;
    emitEvent(eventName: string, data?: any): any;
}
interface IObservedProperties {
    readonly ObservedProperties: any;
}
interface ComponentRef<T extends IObservedProperties> {
    setProps(propertiesObject: {
        [K in T['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
    }): any;
    getInstance(): T;
}
declare type jsonObject = {
    [index: string]: any;
};
export { DecoratorOptions, IHooks, jsonObject, Renderer, ComponentRef };
