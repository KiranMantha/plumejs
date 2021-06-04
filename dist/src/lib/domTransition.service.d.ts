export declare class DomTransition {
    private transition;
    constructor();
    private removeTransition;
    private whichTransitionEnd;
    onTransitionEnd(element: HTMLElement, cb: () => void, duration: number): void;
}
