export declare function useFormFields<T>(initialValues: T): {
    formFields: T;
    createChangeHandler: (key: keyof T) => (e: Event) => void;
};
