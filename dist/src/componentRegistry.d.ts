interface IComponentRegistry {
    globalStyles: CSSStyleSheet | string;
    globalStyleTag: Node;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    getComputedCss: (styles: string, standalone: boolean) => CSSStyleSheet[];
}
declare const componentRegistry: IComponentRegistry;
export { componentRegistry };
