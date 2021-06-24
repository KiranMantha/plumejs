export declare class TestBed {
    static MockComponent<T extends {
        prototype: any;
    }>(target: T): Promise<unknown>;
    static MockService(name: string, target: any): import("../src/lib/types").jsonObject;
    static RemoveComponent(node: HTMLElement): void;
}
