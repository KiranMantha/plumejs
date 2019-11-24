"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            "transition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd",
            "MozTransition": "transitionend",
            "OTransition": "otransitionend"
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
        element.addEventListener(this.transition, () => {
            called = true;
            this.removeTransition(element);
        }, false);
        let callback = () => {
            if (!called)
                cb && cb();
        };
        setTimeout(callback, duration);
    }
};
DomTransition = __decorate([
    decorators_1.Injectable(),
    __metadata("design:paramtypes", [])
], DomTransition);
exports.DomTransition = DomTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tVHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb21UcmFuc2l0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMEM7QUFHMUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUd6QjtRQUZRLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFHL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE9BQW9CO1FBQzVDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3ZCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBOEI7WUFDNUMsWUFBWSxFQUFFLGVBQWU7WUFDN0Isa0JBQWtCLEVBQUUscUJBQXFCO1lBQ3pDLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLGFBQWEsRUFBRSxnQkFBZ0I7U0FDL0IsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNOO1NBQ0Q7SUFDRixDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQW9CLEVBQUUsRUFBWSxFQUFFLFFBQWdCO1FBQ25FLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLENBQUMsZ0JBQWdCLENBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2YsR0FBRyxFQUFFO1lBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQ0QsS0FBSyxDQUNMLENBQUM7UUFDRixJQUFJLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU07Z0JBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQztRQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNELENBQUE7QUE1Q1ksYUFBYTtJQUR6Qix1QkFBVSxFQUFFOztHQUNBLGFBQWEsQ0E0Q3pCO0FBNUNZLHNDQUFhIn0=