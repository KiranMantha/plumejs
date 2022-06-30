interface Control {
    value: string | number | boolean | Array<string | number>;
    errors: Record<string, boolean | any>;
    validators: Array<(value: string | number | boolean | Array<string | number>) => Record<string, any> | null>;
}
declare class Form<T> {
    private _initialValues;
    private _controls;
    private _errors;
    constructor(initialValues: Record<string, any>, controls: Record<string, Control>);
    get errors(): Map<string, Record<string, any>>;
    get valid(): boolean;
    get value(): T;
    get(controlName: string): Control;
    reset(obj?: Record<string, any>): void;
    private _checkValidity;
}
declare const useFormFields: <T extends Record<string, any>>(initialValues: T) => [Form<T>, (key: keyof T) => (e: Event) => void, () => void];
export { Form, useFormFields };
