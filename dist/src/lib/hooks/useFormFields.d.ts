import { jsonObject } from '../types';
declare const useFormFields: (initialValues: jsonObject) => {
    formFields: jsonObject;
    createChangeHandler: (key: string) => (e: Event) => void;
};
export { useFormFields };
