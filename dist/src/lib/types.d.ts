type ConstructorType<T extends {
    new (...args: any[]): T;
}> = T;
interface ComponentDecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    deps?: ConstructorType<any>[];
    standalone?: boolean;
}
interface ServiceDecoratorOptions {
    deps?: ConstructorType<any>[];
}
interface IHooks {
    ObservedProperties?: readonly string[];
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
type InputProps<T> = {
    [K in Extract<T, IHooks>['ObservedProperties'][number]]?: K extends keyof T ? T[K] : never;
};
interface ComponentRef<T> {
    setProps(propertiesObject: InputProps<T>): void;
    getInstance(): T;
}
export { ComponentDecoratorOptions, ServiceDecoratorOptions, IHooks, Renderer, ComponentRef, ConstructorType, InputProps };
