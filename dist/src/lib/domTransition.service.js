"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomTransition = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const decorators_1 = require("./decorators");
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
        let eventSubscription = null;
        const _fn = () => {
            if (!called) {
                called = true;
                cb && cb();
                eventSubscription.unsubscribe();
                eventSubscription = null;
            }
        };
        eventSubscription = (0, rxjs_1.fromEvent)(element, this.transition).subscribe(() => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
};
DomTransition = (0, tslib_1.__decorate)([
    (0, decorators_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], DomTransition);
exports.DomTransition = DomTransition;
