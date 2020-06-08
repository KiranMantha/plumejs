"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _componentRegistry {
    constructor() {
        this.getComputedCss = (useShadow, styles = "") => {
            let csoArray = [];
            if (useShadow) {
                let defaultStyles = new CSSStyleSheet();
                defaultStyles.insertRule(`:host { display: block; }`);
                csoArray = [this.globalStyles, defaultStyles];
                if (styles) {
                    let sheet = new CSSStyleSheet();
                    sheet.replace(styles);
                    csoArray.push(sheet);
                }
            }
            return csoArray;
        };
        try {
            this.globalStyles = new CSSStyleSheet();
        }
        catch (e) {
            this.globalStyles = '';
        }
        this.isRootNodeSet = false;
    }
}
const componentRegistry = new _componentRegistry();
exports.componentRegistry = componentRegistry;
