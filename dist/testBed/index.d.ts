export declare class TestBed {
    static MockComponent(target: () => void): Promise<unknown>;
    static MockService(name: string, target: any): import("../src/lib/types").jsonObject;
    static RemoveComponent(node: HTMLElement): void;
}
