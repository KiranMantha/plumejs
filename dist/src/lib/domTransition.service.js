import { __decorate, __metadata } from "tslib";
import { Injectable } from "./decorators";
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
DomTransition = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DomTransition);
export { DomTransition };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tVHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb21UcmFuc2l0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUd6QjtRQUZRLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFHL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE9BQW9CO1FBQzVDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3pCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLFdBQVcsR0FBOEI7WUFDNUMsVUFBVSxFQUFFLGVBQWU7WUFDM0IsZ0JBQWdCLEVBQUUscUJBQXFCO1lBQ3ZDLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFdBQVcsRUFBRSxnQkFBZ0I7U0FDN0IsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNOO1NBQ0Q7SUFDRixDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQW9CLEVBQUUsRUFBWSxFQUFFLFFBQWdCO1FBQ25FLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtRQUNGLENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDdkIsSUFBSSxDQUFDLFVBQVUsRUFDZixHQUFHLEVBQUU7WUFDSixHQUFHLEVBQUUsQ0FBQztRQUNQLENBQUMsRUFDRCxLQUFLLENBQ0wsQ0FBQztRQUNGLElBQUksUUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNuQixHQUFHLEVBQUUsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNELENBQUE7QUFsRFksYUFBYTtJQUR6QixVQUFVLEVBQUU7O0dBQ0EsYUFBYSxDQWtEekI7U0FsRFksYUFBYSJ9