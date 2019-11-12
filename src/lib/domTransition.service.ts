import { Injectable } from './decorators';

@Injectable()
export class DomTransition {
	private transition: string = "";

	constructor() {
		this.whichTransitionEnd();
	}

	private removeTransition(element: HTMLElement) {
		element.removeEventListener(this.transition, () => {}, false);
	}

	private whichTransitionEnd() {
    let element = document.createElement("div");
    let styleobj:any = element.style;
		let transitions:{ [key: string]: string; } = {
			"transition": "transitionend",
			"WebkitTransition": "webkitTransitionEnd",
			"MozTransition": "transitionend",
			"OTransition": "otransitionend"
		};

		for (let t in transitions) {
			if (typeof styleobj[t] !== "undefined") {
				this.transition = transitions[t];
				break;
			}
		}
	}

	onTransitionEnd(element: HTMLElement, cb: Function, duration: number) {
		let called = false;
		element.addEventListener(
			this.transition,
			() => {
        called = true;
        this.removeTransition(element);
			},
			false
		);
		let callback = () => {
			if (!called) cb && cb();
		};
		setTimeout(callback, duration);
	}
}
