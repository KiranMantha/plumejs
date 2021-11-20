interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface IHooks {
    readonly ObservedProperties?: any;
    beforeMount?: () => void;
    mount?: () => void;
    unmount?: () => void;
    onPropsChanged?: () => void;
}
declare class Renderer {
    shadowRoot: ShadowRoot;
    update: () => void;
    emitEvent: (eventName: string, data?: any, isBubbling?: boolean) => void;
}
interface ComponentRef<T> {
    setProps(propertiesObject: {
        [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
    }): void;
    getInstance(): T;
}
export { DecoratorOptions, IHooks, Renderer, ComponentRef };
