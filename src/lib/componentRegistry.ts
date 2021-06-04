interface IComponentRegistry {
  globalStyles: any;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;
  getComputedCss: (useShadow: boolean, styles: string) => CSSStyleSheet[];
}

const componentRegistry: IComponentRegistry = new (class implements IComponentRegistry {
  globalStyles: any;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;

  constructor() {
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch (e) {
      this.globalStyles = '';
    }

    this.isRootNodeSet = false;
  }

  getComputedCss = (useShadow: boolean, styles = '') => {
    let csoArray = [];
    if (useShadow) {
      const defaultStyles = new CSSStyleSheet();
      defaultStyles.insertRule(`:host { display: block; }`);
      csoArray = [this.globalStyles, defaultStyles];
      if (styles) {
        const sheet: any = new CSSStyleSheet();
        sheet.replace(styles);
        csoArray.push(sheet);
      }
    }
    return csoArray;
  };
})();

export { componentRegistry };
