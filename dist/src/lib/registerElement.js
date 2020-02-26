import { klass, INPUT_METADATA_KEY } from "./utils";
import { render } from "lighterhtml";
import { watch, unwatch } from "./watchObject";
import { instantiate } from "./instance";
import { InternalTranslationService } from "./translationService";
import { augmentor } from "augmentor";
import { Injector } from './service_resolver';
let isRootNodeSet = false;
let globalStyles = new CSSStyleSheet();
let style_registry = new Map();
const wrapper = (fn, deps, props) => () => instantiate(fn, deps, props);
const getCss = (csspath) => {
    return style_registry.has(csspath) ? style_registry.get(csspath) : '';
};
const getComputedCss = (csspath = "") => {
    let sheet = new CSSStyleSheet();
    if (csspath) {
        sheet.replace(getCss(csspath));
    }
    return [globalStyles, sheet];
};
const registerElement = (options, target, providers, isRoot, isTestEnv) => {
    if (!isTestEnv) {
        if (isRoot && !isRootNodeSet && options.styleUrl) {
            style_registry = Injector.get('COMPILEDCSS');
            isRootNodeSet = true;
            const styletag = document.createElement("style");
            let styles = getCss(options.styleUrl);
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
                return this[klass];
            };
            this.shadow = isTestEnv ? this : this.attachShadow({ mode: "open" });
            getComputedCss(options.styleUrl);
            this.shadow.adoptedStyleSheets = !isTestEnv ? getComputedCss(options.styleUrl) : [];
            this._inputprop = Reflect.getMetadata(INPUT_METADATA_KEY, target);
            if (this._inputprop) {
                watch(this, this._inputprop, (newvalue, oldvalue) => {
                    if (oldvalue !== newvalue) {
                        if (this[klass] && this[klass][this._inputprop]) {
                            this[klass][this._inputprop] = this[this._inputprop];
                            this.update();
                        }
                    }
                });
            }
        }
        init() {
            let _returnfn = this[klass].render.bind(this[klass]);
            render.bind(this[klass], this.shadow, _returnfn)();
        }
        connectedCallback() {
            this[klass] = augmentor(wrapper(target, providers, this[this._inputprop]))();
            this[klass]["element"] = this.shadow;
            this[klass].beforeMount && this[klass].beforeMount();
            this.init();
            this[klass]["update"] = this.update.bind(this);
            this[klass].mount && this[klass].mount();
            InternalTranslationService.translationComponents.set(this, options.selector);
        }
        disconnectedCallback() {
            InternalTranslationService.translationComponents.delete(this);
            this._inputprop && unwatch(this);
            this[klass].unmount && this[klass].unmount();
        }
    });
};
export { registerElement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJFbGVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWdpc3RlckVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFekMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLElBQUksWUFBWSxHQUFRLElBQUksYUFBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxjQUFjLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7QUFFcEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxFQUFZLEVBQUUsSUFBbUIsRUFBRSxLQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRXRHLE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBYyxFQUFFLEVBQUU7SUFDakMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUUsRUFBRTtJQUMvQyxJQUFJLEtBQUssR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO0lBQ3JDLElBQUksT0FBTyxFQUFFO1FBQ1osS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUNELE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsQ0FDdkIsT0FBeUIsRUFDekIsTUFBZ0IsRUFDaEIsU0FBd0IsRUFDeEIsTUFBZSxFQUNmLFNBQWtCLEVBQ2pCLEVBQUU7SUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2YsSUFBSSxNQUFNLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNqRCxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9DLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNoRCxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxNQUFNLElBQUksYUFBYSxFQUFFO1lBQ25DLE1BQU0sS0FBSyxDQUNWLDhDQUE4QztnQkFDN0MsT0FBTyxDQUFDLFFBQVE7Z0JBQ2hCLFlBQVksQ0FDYixDQUFDO1NBQ0Y7S0FDRDtJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUMzQixPQUFPLENBQUMsUUFBUSxFQUNoQixLQUFNLFNBQVEsV0FBVztRQUt4QjtZQUNDLEtBQUssRUFBRSxDQUFDO1lBZ0NULFdBQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDO1lBRUYsYUFBUSxHQUFHLEdBQUcsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFyQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BGLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQWEsRUFBRSxRQUFhLEVBQUUsRUFBRTtvQkFDN0QsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO3dCQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFJLElBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQzlELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt5QkFDZDtxQkFDRDtnQkFDRixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQztRQUVPLElBQUk7WUFDWCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDcEQsQ0FBQztRQUVELGlCQUFpQjtZQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFHLElBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFVRCxvQkFBb0I7WUFDbkIsMEJBQTBCLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlDLENBQUM7S0FDRCxDQUNELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMifQ==