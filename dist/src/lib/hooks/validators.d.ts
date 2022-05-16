export declare class Validators {
    static required(value: any): {
        required: boolean;
    };
    static min(length: number): (value: any) => {
        minLength: {
            requiredLength: number;
        };
    };
    static max(length: number): (value: any) => {
        maxLength: {
            requiredLength: number;
        };
    };
    static pattern(expression: string | RegExp): (value: any) => {
        pattern: boolean;
    };
}
