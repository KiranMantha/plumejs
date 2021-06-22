import { jsonObject } from '../types';
declare const useFormFields: <T extends jsonObject>(initialValues: T) => {
    formFields: jsonObject;
    createChangeHandler: (key: keyof T) => (e: Event) => void;
};
export { useFormFields };
