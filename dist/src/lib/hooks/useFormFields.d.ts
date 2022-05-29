interface Control {
    value: string | number | boolean | Array<string | number>;
    errors: Record<string, boolean | any>;
    validators: Array<(value: string | number | boolean | Array<string | number>) => Record<string, any> | null>;
}
declare class Form {
    private _initialValues;
    private _controls;
    private _errors;
    constructor(initialValues: Record<string, any>, controls: Record<string, Control>);
    get errors(): Map<string, Record<string, any>>;
    get valid(): boolean;
    get value(): {};
    get(controlName: string): Control;
    checkValidity(): void;
    reset(obj?: Record<string, any>): void;
}
declare const useFormFields: <T extends Record<string, any>>(initialValues: T) => [Form, (key: keyof T) => (e: Event) => void, () => void];
export { Form, useFormFields };
