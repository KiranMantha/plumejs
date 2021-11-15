var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { fromEvent } from 'rxjs';
import { Injectable } from './decorators';
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
        eventSubscription = fromEvent(element, this.transition).subscribe(() => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
};
DomTransition = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DomTransition);
export { DomTransition };
