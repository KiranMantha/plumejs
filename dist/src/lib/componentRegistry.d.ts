declare const componentRegistry: {
    globalStyles: any;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    getComputedCss: (useShadow: boolean, styles?: string) => any[];
};
export { componentRegistry };
