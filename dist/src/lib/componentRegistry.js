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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50UmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudFJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxrQkFBa0I7SUFLdEI7UUFVQSxtQkFBYyxHQUFHLENBQUMsU0FBa0IsRUFBRSxTQUFpQixFQUFFLEVBQUUsRUFBRTtZQUMzRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBRyxTQUFTLEVBQUU7Z0JBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsYUFBYSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUN0RCxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLE1BQU0sRUFBRTtvQkFDVixJQUFJLEtBQUssR0FBUSxJQUFJLGFBQWEsRUFBRSxDQUFDO29CQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjthQUNGO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBdEJBLElBQUk7WUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDekM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztDQWdCRjtBQUVELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBRTFDLDhDQUFpQiJ9