import { Injector } from './service_resolver';

class _componentRegistry {
  globalStyles: any;
  style_registry: Map<string, string>;
  isRootNodeSet: boolean;

  constructor(){
    this.style_registry = Injector.get('COMPILEDCSS');
    this.globalStyles = new CSSStyleSheet();
    this.isRootNodeSet = false;
  }

  getCss = (csspath: string) => {
    return this.style_registry.has(csspath) ? this.style_registry.get(csspath) : '';
  }

  getComputedCss = (useShadow: boolean, csspath: string = "") => {
    let csoArray = [];
    if(useShadow) {
      let defaultStyles = new CSSStyleSheet();
      defaultStyles.insertRule(`:host { display: block; }`);
      csoArray = [this.globalStyles, defaultStyles];
      if (csspath) {
        let sheet: any = new CSSStyleSheet();
        let styles = this.getCss(csspath);
        styles ? sheet.replace(styles) : sheet.replace(csspath);
        csoArray.push(sheet);
      }
    }
    return csoArray;
  };
}

const componentRegistry = new _componentRegistry();

export { componentRegistry };