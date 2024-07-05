export type ConstructorType<T> = new (...args: unknown[]) => T;
export type DynamicCssImport = Promise<typeof import('*.scss') | typeof import('*.css') | typeof import('*.less')>;
export interface ComponentDecoratorOptions {
    selector: string;
    styles?: string | DynamicCssImport;
    root?: boolean;
    deps?: ConstructorType<unknown>[];
    standalone?: boolean;
    shadowDomEncapsulation?: boolean;
}
export interface ServiceDecoratorOptions {
    deps?: ConstructorType<unknown>[];
}
export interface IHooks {
    observedAttributes?: readonly string[];
    observedProperties?: readonly string[];
    render: () => DocumentFragment | string;
    beforeMount?: () => void;
    mount?: () => void;
    unmount?: () => void;
    onPropertiesChanged?: () => void;
    onAttributesChanged?: (name: string, oldValue: string, newValue: string) => void;
}
export declare class Renderer {
    private _hostElement;
    private _shadowRoot;
    get __metadata__(): {
        name: string;
    };
    get hostElement(): HTMLElement;
    get shadowRoot(): ShadowRoot;
    update: () => void;
    emitEvent: <T>(eventName: string, data?: T, isBubbling?: boolean) => void;
    constructor(_hostElement: HTMLElement, _shadowRoot: ShadowRoot);
}
export type InputProps<T> = {
    [K in Extract<T, IHooks>['observedProperties'][number]]?: K extends keyof T ? T[K] : never;
};
export interface ComponentRef<T> {
    setProps(propertiesObject: InputProps<T>): void;
    getInstance(): T;
}
