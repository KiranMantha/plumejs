export default class TestBed {
    static MockComponent(options: {
        selector: string;
        target: Function;
    }): Promise<any>;
    static MockService(name: string, target: any): any;
    static RemoveComponent(node: HTMLElement): void;
}
