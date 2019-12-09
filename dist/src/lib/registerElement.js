"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const augmentor_1 = __importDefault(require("augmentor"));
const translationService_1 = require("./translationService");
const getValue = (obj, key) => {
    return obj[key] || null;
};
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = {};
const getComputedCss = (csspath = "") => {
    let sheet = new CSSStyleSheet();
    if (csspath) {
        let styles = style_registry[csspath]
            ? style_registry[csspath]
            : Promise.resolve().then(() => __importStar(require("src/" + csspath)));
        style_registry[csspath] = styles;
        sheet.replace(styles);
    }
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers, isRoot, isUnitTestEnv = false) => {
    if (isRoot && !isRootNodeSet && options.styleUrl) {
        isRootNodeSet = true;
        const styletag = document.createElement("style");
        let styles = require("src/" + options.styleUrl);
        styletag.innerText = (styles || "").toString();
        globalStyles.replace((styles || "").toString());
        document.getElementsByTagName("head")[0].appendChild(styletag);
    }
    else if (isRoot && isRootNodeSet) {
        throw Error("Cannot register duplicate root component in " +
            options.selector +
            " component");
    }
    window.customElements.define(options.selector, class extends HTMLElement {
        constructor() {
            super();
            this.update = () => {
                this.init();
            };
            this.getModel = () => {
                return this[utils_1.klass];
            };
            this.shadow = (isUnitTestEnv || options.useShadow === false) ? this : this.attachShadow({ mode: "open" });
            this.shadow.adoptedStyleSheets = getComputedCss(options.styleUrl);
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = getValue(this, this._inputprop);
                            this.update();
                        }
                    }
                });
            }
            return this;
        }
        renderTemplate() {
            return augmentor_1.default(this[utils_1.klass].render.bind(this[utils_1.klass]))();
        }
        init() {
            let _returnfn = this.renderTemplate();
            return lighterhtml_1.render.bind(this[utils_1.klass], this.shadow, _returnfn)();
        }
        connectedCallback() {
            this[utils_1.klass] = instance_1.instantiate(target, providers, getValue(this, this._inputprop) || {});
            this[utils_1.klass]["element"] = this.shadow;
            this[utils_1.klass].beforeMount && this[utils_1.klass].beforeMount();
            this.init();
            this[utils_1.klass]["update"] = this.update.bind(this);
            this[utils_1.klass].mount && this[utils_1.klass].mount();
            translationService_1.InternalTranslationService.translationComponents.push(this);
        }
        disconnectedCallback() {
            this._inputprop && watchObject_1.unwatch(this);
            this[utils_1.klass].unmount && this[utils_1.klass].unmount();
        }
    });
};
exports.registerElement = registerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW9EO0FBQ3BELDZDQUFxQztBQUNyQywrQ0FBK0M7QUFDL0MseUNBQXlDO0FBRXpDLDBEQUFrQztBQUNsQyw2REFBa0U7QUFFbEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFlLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDakQsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixJQUFJLFlBQVksR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksY0FBYyxHQUFlLEVBQUUsQ0FBQztBQUVwQyxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEVBQUU7UUFDWixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ3pCLENBQUMsbURBQVEsTUFBTSxHQUFHLE9BQU8sR0FBQyxDQUFDO1FBQzVCLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0QjtJQUNELE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FDdkIsT0FBeUIsRUFDekIsTUFBZ0IsRUFDaEIsU0FBd0IsRUFDeEIsTUFBZSxFQUNmLGdCQUF5QixLQUFLLEVBQzdCLEVBQUU7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