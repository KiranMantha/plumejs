export declare class DomTransition {
    private transition;
    constructor();
    onTransitionEnd(element: HTMLElement, cb: () => void, duration: number): void;
    animationsComplete(element: HTMLElement): Promise<any>;
    private whichTransitionEnd;
}
