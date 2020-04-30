declare class _componentRegistry {
    globalStyles: any;
    style_registry: Map<string, string>;
    isRootNodeSet: boolean;
    constructor();
    getCss: (csspath: string) => string;
    getComputedCss: (useShadow: boolean, csspath?: string) => any[];
}
declare const componentRegistry: _componentRegistry;
export { componentRegistry };
