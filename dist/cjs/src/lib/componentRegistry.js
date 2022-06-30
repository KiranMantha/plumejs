"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRegistry = void 0;
const componentRegistry = new (class {
    constructor() {
        this.getComputedCss = (styles = '', standalone) => {
            let csoArray = [];
            const defaultStyles = new CSSStyleSheet();
            defaultStyles.insertRule(`:host { display: block; }`);
            csoArray = !!standalone ? [defaultStyles] : [this.globalStyles, defaultStyles];
            if (styles) {
                const sheet = new CSSStyleSheet();
                sheet.replace(styles);
                csoArray.push(sheet);
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
        this.globalStyleTag = null;
    }
})();
exports.componentRegistry = componentRegistry;
