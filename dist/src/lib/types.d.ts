declare type ConstructorType<T extends {
    new (...args: any[]): T;
}> = T;
interface ComponentDecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    deps?: ConstructorType<any>[];
}
interface ServiceDecoratorOptions {
    name: string;
    deps?: ConstructorType<any>[];
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
    static get __metadata__(): {
        name: string;
    };
}
interface ComponentRef<T> {
    setProps(propertiesObject: {
        [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
    }): void;
    getInstance(): T;
}
export { ComponentDecoratorOptions, ServiceDecoratorOptions, IHooks, Renderer, ComponentRef, ConstructorType };
