declare const useFormFields: <T extends Record<string, any>>(initialValues: T) => [T, (key: keyof T) => (e: Event) => void, () => void];
export { useFormFields };
