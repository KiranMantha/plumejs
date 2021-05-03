const componentRegistry = new class {
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

  getComputedCss = (useShadow: boolean, styles: string = "") => {
    let csoArray = [];
    if (useShadow) {
      let defaultStyles = new CSSStyleSheet();
      defaultStyles.insertRule(`:host { display: block; }`);
      csoArray = [this.globalStyles, defaultStyles];
      if (styles) {
        let sheet: any = new CSSStyleSheet();
        sheet.replace(styles);
        csoArray.push(sheet);
      }
    }
    return csoArray;
  };
}

export { componentRegistry };

