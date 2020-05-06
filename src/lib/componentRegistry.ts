class _componentRegistry {
  globalStyles: any;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;

  constructor(){
    this.globalStyles = new CSSStyleSheet();
    this.isRootNodeSet = false;
  }

  getComputedCss = (useShadow: boolean, styles: string = "") => {
    let csoArray = [];
    if(useShadow) {
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

const componentRegistry = new _componentRegistry();

export { componentRegistry };