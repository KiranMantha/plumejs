"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentRegistry = void 0;
const componentRegistry = new (class {
    globalStyles;
    style_registry;
    isRootNodeSet;
    globalStyleTag;
    constructor() {
        try {
            this.globalStyles = new CSSStyleSheet();
        }
        catch (e) {
            this.globalStyles = '';
        }
        this.isRootNodeSet = false;
        this.globalStyleTag = null;
    }
    getComputedCss = (styles = '') => {
        let csoArray = [];
        const defaultStyles = new CSSStyleSheet();
        defaultStyles.insertRule(`:host { display: block; }`);
        csoArray = [this.globalStyles, defaultStyles];
        if (styles) {
            const sheet = new CSSStyleSheet();
            sheet.replace(styles);
            csoArray.push(sheet);
        }
        return csoArray;
    };
})();
exports.componentRegistry = componentRegistry;
