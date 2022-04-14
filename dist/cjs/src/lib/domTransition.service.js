"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomTransition = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("./decorators");
const utils_1 = require("./utils");
let DomTransition = class DomTransition {
    constructor() {
        this.transition = '';
        this.whichTransitionEnd();
    }
    onTransitionEnd(element, cb, duration) {
        let called = false;
        let unSubscribeEvent = null;
        const _fn = () => {
            if (!called) {
                called = true;
                cb && cb();
                unSubscribeEvent();
                unSubscribeEvent = null;
            }
        };
        unSubscribeEvent = (0, utils_1.fromVanillaEvent)(element, this.transition, () => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
    animationsComplete(element) {
        if (element.getAnimations) {
            return Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
        }
        else {
            return Promise.allSettled([true]);
        }
    }
    whichTransitionEnd() {
        const element = document.createElement('div');
        const styleobj = element.style;
        const transitions = {
            transition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'otransitionend'
        };
        for (const t in transitions) {
            if (typeof styleobj[t] !== 'undefined') {
                this.transition = transitions[t];
                break;
            }
        }
    }
};
DomTransition = (0, tslib_1.__decorate)([
    (0, decorators_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], DomTransition);
exports.DomTransition = DomTransition;
