import { Injectable } from './decorators';

@Injectable()
export class DomTransition {
  private transition = '';

  constructor() {
    this.whichTransitionEnd();
  }

  private removeTransition(element: HTMLElement, fn) {
    element.removeEventListener(this.transition, fn, false);
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
    const _fn = () => {
      if (!called) {
        called = true;
        cb && cb();
        this.removeTransition(element, _fn);
      }
    };
    element.addEventListener(
      this.transition,
      () => {
        _fn();
      },
      false
    );
    const callback = () => {
      _fn();
    };
    setTimeout(callback, duration);
  }
}
