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
