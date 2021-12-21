import { Injectable } from './decorators';
import { fromEvent } from './utils';

@Injectable()
export class DomTransition {
  private transition = '';

  constructor() {
    this.whichTransitionEnd();
  }

  private whichTransitionEnd() {
    const element = document.createElement('div');
    const styleobj: any = element.style;
    const transitions: { [key: string]: string } = {
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

  onTransitionEnd(element: HTMLElement, cb: () => void, duration: number) {
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
}
