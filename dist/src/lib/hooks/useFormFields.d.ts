interface Control {
    value: string | number | boolean | Array<string | number>;
    errors: Record<string, boolean | any>;
    validators: Array<(value: string | number | boolean | Array<string | number>) => Record<string, any> | null>;
}
declare class Form {
    private _controls;
    private _errors;
    constructor(controls: Record<string, Control>);
    get errors(): Map<string, Record<string, any>>;
    get valid(): boolean;
    get value(): {};
    get(controlName: any): Control;
    checkValidity(): void;
    reset(): void;
}
declare const useFormFields: <T extends Record<string, any>>(initialValues: T) => [Form, (key: keyof T) => (e: Event) => void, () => void];
export { Form, useFormFields };
