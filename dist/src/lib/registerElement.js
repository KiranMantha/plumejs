"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const lighterhtml_1 = require("lighterhtml");
const watchObject_1 = require("./watchObject");
const instance_1 = require("./instance");
const translationService_1 = require("./translationService");
const augmentor_1 = require("augmentor");
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = {};
const wrapper = (fn, deps, props) => {
    return () => instance_1.instantiate(fn, deps, props);
};
const getComputedCss = (csspath = "") => {
    let sheet = new CSSStyleSheet();
    if (csspath) {
        let styles = style_registry[csspath]
            ? style_registry[csspath]
            : require("src/" + csspath);
        style_registry[csspath] = styles;
        sheet.replace(styles);
    }
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers, isRoot, isTestEnv) => {
    if (!isTestEnv) {
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
            this.shadow = isTestEnv ? this : this.attachShadow({ mode: "open" });
            this.shadow.adoptedStyleSheets = !isTestEnv ? getComputedCss(options.styleUrl) : [];
            this._inputprop = Reflect.getMetadata(utils_1.INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watchObject_1.watch(this, this._inputprop, (newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[utils_1.klass] && this[utils_1.klass][this._inputprop]) {
                            this[utils_1.klass][this._inputprop] = this[this._inputprop];
                            this.update();
                        }
                    }
                });
            }
        }
        init() {
            let _returnfn = this[utils_1.klass].render.bind(this[utils_1.klass]);
            lighterhtml_1.render.bind(this[utils_1.klass], this.shadow, _returnfn)();
        }
        connectedCallback() {
            this[utils_1.klass] = augmentor_1.augmentor(wrapper(target, providers, this[this._inputprop]))();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0Q7QUFDcEQsNkNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFFekMsNkRBQWtFO0FBQ2xFLHlDQUFzQztBQUV0QyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDMUIsSUFBSSxZQUFZLEdBQVEsSUFBSSxhQUFhLEVBQUUsQ0FBQztBQUM1QyxJQUFJLGNBQWMsR0FBZSxFQUFFLENBQUM7QUFFcEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxFQUFZLEVBQUUsSUFBbUIsRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUNqRSxPQUFPLEdBQUcsRUFBRSxDQUFDLHNCQUFXLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUMxQyxDQUFDLENBQUM7QUFFRixNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRSxFQUFFO0lBQy9DLElBQUksS0FBSyxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEVBQUU7UUFDWixJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0QjtJQUNELE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FDdkIsT0FBeUIsRUFDekIsTUFBZ0IsRUFDaEIsU0FBd0IsRUFDeEIsTUFBZSxFQUNmLFNBQWtCLEVBQ2pCLEVBQUU7SUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2YsSUFBSSxNQUFNLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNqRCxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDaEQsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksTUFBTSxJQUFJLGFBQWEsRUFBRTtZQUNuQyxNQUFNLEtBQUssQ0FDViw4Q0FBOEM7Z0JBQzdDLE9BQU8sQ0FBQyxRQUFRO2dCQUNoQixZQUFZLENBQ2IsQ0FBQztTQUNGO0tBQ0Q7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDM0IsT0FBTyxDQUFDLFFBQVEsRUFDaEIsS0FBTSxTQUFRLFdBQVc7UUFLeEI7WUFDQyxLQUFLLEVBQUUsQ0FBQztZQWlDVCxXQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLENBQUMsQ0FBQztZQUVGLGFBQVEsR0FBRyxHQUFHLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1lBdENELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLDBCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsbUJBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQWEsRUFBRSxRQUFhLEVBQUUsRUFBRTtvQkFDN0QsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO3dCQUMxQixJQUFJLElBQUksQ0FBQyxhQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUNoRCxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFJLElBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDZDtxQkFDRDtnQkFDRixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQztRQUVPLElBQUk7WUFDWCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxvQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3BELENBQUM7UUFFRCxpQkFBaUI7WUFDaEIsSUFBSSxDQUFDLGFBQUssQ0FBQyxHQUFHLHFCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDckMsU0FBUyxFQUNSLElBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxhQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLCtDQUEwQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBVUQsb0JBQW9CO1lBQ25CLElBQUksQ0FBQyxVQUFVLElBQUkscUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBSyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0tBQ0QsQ0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRU8sMENBQWUifQ==