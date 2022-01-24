import { __decorate, __metadata } from "tslib";
import { Injectable } from './decorators';
import { fromVanillaEvent } from './utils';
let DomTransition = class DomTransition {
    transition = '';
    constructor() {
        this.whichTransitionEnd();
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
        unSubscribeEvent = fromVanillaEvent(element, this.transition, () => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
};
DomTransition = __decorate([
    Injectable({ name: 'DomTransition' }),
    __metadata("design:paramtypes", [])
], DomTransition);
export { DomTransition };
