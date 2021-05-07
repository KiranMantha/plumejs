interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface IHooks {
    mount?: () => void;
    unmount?: () => void;
    inputChanged?: (oldValue: any, newValue: any) => void;
    update?: () => void;
}
declare type Ref<T> = {
    current: T;
};
declare type jsonObject = {
    [index: string]: any;
};
export { DecoratorOptions, Ref, jsonObject, IHooks };
