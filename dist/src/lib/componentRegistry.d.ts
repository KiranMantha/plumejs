interface IComponentRegistry {
    globalStyles: any;
    globalStyleTag: Node;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    getComputedCss: (styles: string) => CSSStyleSheet[];
}
declare const componentRegistry: IComponentRegistry;
export { componentRegistry };
