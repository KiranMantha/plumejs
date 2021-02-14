export declare function useFormFields<T>(initialValues: T): {
    formFields: any;
    createChangeHandler: (key: keyof T) => (e: Event) => void;
};
