interface IComponentRegistry {
  globalStyles: any;
  globalStyleTag: Node;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;
  getComputedCss: (styles: string, standalone: boolean) => CSSStyleSheet[];
}

const componentRegistry: IComponentRegistry = new (class implements IComponentRegistry {
  globalStyles: any;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;
  globalStyleTag: Node;

  constructor() {
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch (e) {
      this.globalStyles = '';
    }

    this.isRootNodeSet = false;
    this.globalStyleTag = null;
  }

  getComputedCss = (styles = '', standalone: boolean) => {
    let csoArray = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(`:host { display: block; }`);
    csoArray = standalone ? [defaultStyles] : [this.globalStyles, defaultStyles];
    if (styles) {
      const sheet: any = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  };
})();

export { componentRegistry };
