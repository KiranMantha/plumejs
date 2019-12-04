export default class TestBed {
    static MockComponent(options: {
        selector: string;
        target: Function;
    }): Promise<any>;
    static MockService(name: string, target: any): void;
    static RemoveComponent(node: HTMLElement): void;
}
