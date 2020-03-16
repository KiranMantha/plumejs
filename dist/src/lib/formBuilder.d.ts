import { Ref } from "./types";
export declare class FormBuilder {
    private _form;
    private _fieldOptions;
    constructor(Form: Ref<HTMLFormElement>, FormFields: {
        (key: string): string;
    });
    patchValue(FormName: string, value: any): void;
    setValue({ FormName: string, value: any }: {
        FormName: any;
        value: any;
    }): void;
    values(): void;
}
