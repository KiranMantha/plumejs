export interface Fixture<T> {
    componentInstance: T;
    element: ShadowRoot;
}
export declare class TestBed {
    static MockComponent<T>(target: ThisType<T>): Promise<Fixture<T>>;
    static MockService(name: string, target: any): Record<string, any>;
    static RemoveComponent<T>(fixture: Fixture<T>): void;
}
