import { Injectable } from "./decorators";
export class DomTransition {
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
}
Injectable("DomTransition")([DomTransition]);
