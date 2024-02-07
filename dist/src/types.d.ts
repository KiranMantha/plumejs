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
    observedAttributes?: readonly string[];
    observedProperties?: readonly string[];
    render: () => DocumentFragment | string;
    beforeMount?: () => void;
    mount?: () => void;
    unmount?: () => void;
    onPropertiesChanged?: () => void;
    onAttributesChanged?: (name: string, oldValue: string, newValue: string) => void;
}
declare class Renderer {
    private _hostElement;
    private _shadowRoot;
    get __metadata__(): {
        name: string;
    };
    get hostElement(): HTMLElement;
    get shadowRoot(): ShadowRoot;
    update: () => void;
    emitEvent: (eventName: string, data?: any, isBubbling?: boolean) => void;
    constructor(_hostElement: HTMLElement, _shadowRoot: ShadowRoot);
}
type InputProps<T> = {
    [K in Extract<T, IHooks>['observedProperties'][number]]?: K extends keyof T ? T[K] : never;
};
interface ComponentRef<T> {
    setProps(propertiesObject: InputProps<T>): void;
    getInstance(): T;
}
export { ComponentDecoratorOptions, ComponentRef, ConstructorType, IHooks, InputProps, Renderer, ServiceDecoratorOptions };
