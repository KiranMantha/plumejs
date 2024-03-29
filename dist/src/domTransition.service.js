import { Injectable } from './decorators';
import { fromEvent } from './utils';
class DomTransition {
    transition = '';
    constructor() {
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
        unSubscribeEvent = fromEvent(element, this.transition, () => {
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
}
Injectable()(DomTransition);
export { DomTransition };
