import { __decorate, __metadata } from "tslib";
import { Injectable } from './decorators';
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
    DomTransition = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], DomTransition);
    return DomTransition;
}());
export { DomTransition };
//# sourceMappingURL=domTransition.service.js.map