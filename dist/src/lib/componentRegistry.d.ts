declare class _componentRegistry {
    globalStyles: any;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    constructor();
    getComputedCss: (useShadow: boolean, styles?: string) => any[];
}
declare const componentRegistry: _componentRegistry;
export { componentRegistry };
