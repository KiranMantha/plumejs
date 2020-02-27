"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var DomTransition = /** @class */ (function () {
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
            transition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend"
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
        var _fn = function () {
            if (!called) {
                called = true;
                cb && cb();
                _this.removeTransition(element);
            }
        };
        element.addEventListener(this.transition, function () {
            _fn();
        }, false);
        var callback = function () {
            _fn();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tVHJhbnNpdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9kb21UcmFuc2l0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTBDO0FBRzFDO0lBR0M7UUFGUSxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyx3Q0FBZ0IsR0FBeEIsVUFBeUIsT0FBb0I7UUFDNUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLDBDQUFrQixHQUExQjtRQUNDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLFdBQVcsR0FBOEI7WUFDNUMsVUFBVSxFQUFFLGVBQWU7WUFDM0IsZ0JBQWdCLEVBQUUscUJBQXFCO1lBQ3ZDLGFBQWEsRUFBRSxlQUFlO1lBQzlCLFdBQVcsRUFBRSxnQkFBZ0I7U0FDN0IsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTthQUNOO1NBQ0Q7SUFDRixDQUFDO0lBRUQsdUNBQWUsR0FBZixVQUFnQixPQUFvQixFQUFFLEVBQVksRUFBRSxRQUFnQjtRQUFwRSxpQkFvQkM7UUFuQkEsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHO1lBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDWCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0I7UUFDRixDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsZ0JBQWdCLENBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2Y7WUFDQyxHQUFHLEVBQUUsQ0FBQztRQUNQLENBQUMsRUFDRCxLQUFLLENBQ0wsQ0FBQztRQUNGLElBQUksUUFBUSxHQUFHO1lBQ2QsR0FBRyxFQUFFLENBQUM7UUFDUCxDQUFDLENBQUM7UUFDRixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFqRFcsYUFBYTtRQUR6Qix1QkFBVSxFQUFFOztPQUNBLGFBQWEsQ0FrRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQWxERCxJQWtEQztBQWxEWSxzQ0FBYSJ9