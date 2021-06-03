interface DecoratorOptions {
    selector: string;
    styles?: string;
    root?: boolean;
    useShadow?: boolean;
}
interface IHooks {
    mount?: () => void;
    unmount?: () => void;
    update?: () => void;
}
declare type jsonObject = {
    [index: string]: any;
};
export { DecoratorOptions, IHooks, jsonObject };
