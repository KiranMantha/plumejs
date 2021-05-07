export declare class TestBed {
    static MockComponent(target: Function): Promise<unknown>;
    static MockService(name: string, target: any): void | {};
    static RemoveComponent(node: HTMLElement): void;
}
