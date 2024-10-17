interface IComponentRegistry {
  globalStyles: CSSStyleSheet | string;
  globalStyleTag: Node;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;
  getComputedCss: (styles: string, standalone: boolean) => CSSStyleSheet[];
}

const componentRegistry: IComponentRegistry = new (class implements IComponentRegistry {
  globalStyles: CSSStyleSheet | string;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;
  globalStyleTag: Node;

  constructor() {
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch (e) {
      console.warn(e);
      this.globalStyles = '';
    }

    this.isRootNodeSet = false;
    this.globalStyleTag = null;
  }

  getComputedCss = (styles = '', standalone: boolean): CSSStyleSheet[] => {
    let csoArray: CSSStyleSheet[] = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(`:host { display: block; }`);
    csoArray = standalone ? [defaultStyles] : [this.globalStyles as CSSStyleSheet, defaultStyles];
    if (styles) {
      const sheet = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  };
})();

export { componentRegistry };
