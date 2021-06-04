import { Injectable } from './decorators';
export class DomTransition {
    transition = '';
    constructor() {
        this.whichTransitionEnd();
    }
    removeTransition(element, fn) {
        element.removeEventListener(this.transition, fn, false);
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
        const _fn = () => {
            if (!called) {
                called = true;
                cb && cb();
                this.removeTransition(element, _fn);
            }
        };
        element.addEventListener(this.transition, () => {
            _fn();
        }, false);
        const callback = () => {
            _fn();
        };
        setTimeout(callback, duration);
    }
}
Injectable("DomTransition")([DomTransition]);
