declare class SampleService {
    constructor();
    testMeth(): void;
}
declare class TestService {
    private sampleSrvc;
    constructor(sampleSrvc: SampleService);
    testMeth(): void;
    getUsers(): Promise<Response>;
}
export default class SampleEle {
    private testSrvc;
    test: string;
    outCount: Function;
    update: any;
    props: any;
    constructor(testSrvc: TestService);
    render(): import("lighterhtml").Hole;
    count(val: string): void;
    beforeMount(): void;
    mount(): void;
    unmount(): void;
}
export {};
