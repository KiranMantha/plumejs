"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
class _componentRegistry {
    constructor() {
        this.getCss = (csspath) => {
            return this.style_registry.has(csspath) ? this.style_registry.get(csspath) : '';
        };
        this.getComputedCss = (useShadow, csspath = "") => {
            let csoArray = [];
            if (useShadow) {
                let defaultStyles = new CSSStyleSheet();
                defaultStyles.insertRule(`:host { display: block; }`);
                csoArray = [this.globalStyles, defaultStyles];
                if (csspath) {
                    let sheet = new CSSStyleSheet();
                    let styles = this.getCss(csspath);
                    styles ? sheet.replace(styles) : sheet.replace(csspath);
                    csoArray.push(sheet);
                }
            }
            return csoArray;
        };
        this.style_registry = service_resolver_1.Injector.get('COMPILEDCSS');
        this.globalStyles = new CSSStyleSheet();
        this.isRootNodeSet = false;
    }
}
const componentRegistry = new _componentRegistry();
exports.componentRegistry = componentRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50UmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudFJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQThDO0FBRTlDLE1BQU0sa0JBQWtCO0lBS3RCO1FBTUEsV0FBTSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsRixDQUFDLENBQUE7UUFFRCxtQkFBYyxHQUFHLENBQUMsU0FBa0IsRUFBRSxVQUFrQixFQUFFLEVBQUUsRUFBRTtZQUM1RCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBRyxTQUFTLEVBQUU7Z0JBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsYUFBYSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUN0RCxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxJQUFJLEtBQUssR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO29CQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0Y7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUM7UUF2QkEsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztDQXFCRjtBQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBRTFDLDhDQUFpQiJ9