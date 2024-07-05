declare class DomTransition {
    private transition;
    constructor();
    onTransitionEnd(element: HTMLElement, callback: () => void, duration: number): void;
    animationsComplete(element: HTMLElement): Promise<boolean>;
    private whichTransitionEnd;
}
export { DomTransition };
