"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var DomTransition = (function () {
    function DomTransition() {
        this.transition = "";
        this.whichTransitionEnd();
    }
    DomTransition.prototype.removeTransition = function (element) {
        element.removeEventListener(this.transition, function () { }, false);
    };
    DomTransition.prototype.whichTransitionEnd = function () {
        var element = document.createElement("div");
        var styleobj = element.style;
        var transitions = {
            "transition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd",
            "MozTransition": "transitionend",
            "OTransition": "otransitionend"
        };
        for (var t in transitions) {
            if (typeof styleobj[t] !== "undefined") {
                this.transition = transitions[t];
                break;
            }
        }
    };
    DomTransition.prototype.onTransitionEnd = function (element, cb, duration) {
        var _this = this;
        var called = false;
        element.addEventListener(this.transition, function () {
            called = true;
            _this.removeTransition(element);
        }, false);
        var callback = function () {
            if (!called)
                cb && cb();
        };
        setTimeout(callback, duration);
    };
    DomTransition = tslib_1.__decorate([
        decorators_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], DomTransition);
    return DomTransition;
}());
exports.DomTransition = DomTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tVHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb21UcmFuc2l0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTBDO0FBRzFDO0lBR0M7UUFGUSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsT0FBb0I7UUFDNUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLDBDQUFrQixHQUExQjtRQUNHLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBOEI7WUFDNUMsWUFBWSxFQUFFLGVBQWU7WUFDN0Isa0JBQWtCLEVBQUUscUJBQXFCO1lBQ3pDLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLGFBQWEsRUFBRSxnQkFBZ0I7U0FDL0IsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNOO1NBQ0Q7SUFDRixDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixPQUFvQixFQUFFLEVBQVksRUFBRSxRQUFnQjtRQUFwRSxpQkFjQztRQWJBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLENBQUMsZ0JBQWdCLENBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2Y7WUFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFDRCxLQUFLLENBQ0wsQ0FBQztRQUNGLElBQUksUUFBUSxHQUFHO1lBQ2QsSUFBSSxDQUFDLE1BQU07Z0JBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQztRQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQTNDVyxhQUFhO1FBRHpCLHVCQUFVLEVBQUU7O09BQ0EsYUFBYSxDQTRDekI7SUFBRCxvQkFBQztDQUFBLEFBNUNELElBNENDO0FBNUNZLHNDQUFhIn0=