import { fromEvent } from 'rxjs';
import { Injectable } from './decorators';
export class DomTransition {
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
        let eventSubscription = null;
        const _fn = () => {
            if (!called) {
                called = true;
                cb && cb();
                eventSubscription.unsubscribe();
                eventSubscription = null;
            }
        };
        eventSubscription = fromEvent(element, this.transition).subscribe(() => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
}
Injectable("DomTransition")([DomTransition]);
