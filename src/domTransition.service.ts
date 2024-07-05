import { Injectable } from './decorators';
import { fromEvent } from './utils';

class DomTransition {
  private transition = '';

  constructor() {
    this.whichTransitionEnd();
  }

  onTransitionEnd(element: HTMLElement, callback: () => void, duration: number) {
    let called = false;
    let unSubscribeEvent: () => void = null;
    const _fn = () => {
      if (!called) {
        called = true;
        callback && callback();
        unSubscribeEvent();
        unSubscribeEvent = null;
      }
    };
    unSubscribeEvent = fromEvent(element, this.transition, () => {
      _fn();
    });
    setTimeout(_fn, duration);
  }

  animationsComplete(element: HTMLElement): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (element.getAnimations) {
        Promise.allSettled(element.getAnimations().map((animation: Animation) => animation.finished)).then(() => {
          resolve(true);
        });
      } else {
        resolve(true);
      }
    });
  }

  private whichTransitionEnd() {
    const element = document.createElement('div');
    const styleobj = element.style;
    const transitions: Record<string, string> = {
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
