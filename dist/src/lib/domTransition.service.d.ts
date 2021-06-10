export declare class DomTransition {
    private transition;
    constructor();
    private whichTransitionEnd;
    onTransitionEnd(element: HTMLElement, cb: () => void, duration: number): void;
}
