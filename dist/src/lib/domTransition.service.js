"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("./decorators");
let DomTransition = class DomTransition {
    constructor() {
        this.transition = "";
        this.whichTransitionEnd();
    }
    removeTransition(element) {
        element.removeEventListener(this.transition, () => { }, false);
    }
    whichTransitionEnd() {
        let element = document.createElement("div");
        let styleobj = element.style;
        let transitions = {
            transition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend"
        };
        for (let t in transitions) {
            if (typeof styleobj[t] !== "undefined") {
                this.transition = transitions[t];
                break;
            }
        }
    }
    onTransitionEnd(element, cb, duration) {
        let called = false;
        let _fn = () => {
            if (!called) {
                called = true;
                cb && cb();
                this.removeTransition(element);
            }
        };
        element.addEventListener(this.transition, () => {
            _fn();
        }, false);
        let callback = () => {
            _fn();
        };
        setTimeout(callback, duration);
    }
};
DomTransition = tslib_1.__decorate([
    decorators_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], DomTransition);
exports.DomTransition = DomTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tVHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb21UcmFuc2l0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTBDO0FBRzFDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFHekI7UUFGUSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxPQUFvQjtRQUM1QyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLGtCQUFrQjtRQUN6QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksUUFBUSxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxXQUFXLEdBQThCO1lBQzVDLFVBQVUsRUFBRSxlQUFlO1lBQzNCLGdCQUFnQixFQUFFLHFCQUFxQjtZQUN2QyxhQUFhLEVBQUUsZUFBZTtZQUM5QixXQUFXLEVBQUUsZ0JBQWdCO1NBQzdCLENBQUM7UUFFRixLQUFLLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUMxQixJQUFJLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07YUFDTjtTQUNEO0lBQ0YsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFvQixFQUFFLEVBQVksRUFBRSxRQUFnQjtRQUNuRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0I7UUFDRixDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsZ0JBQWdCLENBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2YsR0FBRyxFQUFFO1lBQ0osR0FBRyxFQUFFLENBQUM7UUFDUCxDQUFDLEVBQ0QsS0FBSyxDQUNMLENBQUM7UUFDRixJQUFJLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDbkIsR0FBRyxFQUFFLENBQUM7UUFDUCxDQUFDLENBQUM7UUFDRixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRCxDQUFBO0FBbERZLGFBQWE7SUFEekIsdUJBQVUsRUFBRTs7R0FDQSxhQUFhLENBa0R6QjtBQWxEWSxzQ0FBYSJ9