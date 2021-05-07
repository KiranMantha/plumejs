interface IComponentRegistry {
    globalStyles: any;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    getComputedCss: (useShadow: boolean, styles: string) => CSSStyleSheet[];
}
declare const componentRegistry: IComponentRegistry;
export { componentRegistry };
