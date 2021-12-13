import { useState } from './useState';
const _getTargetValue = (target) => {
    let targetValue;
    switch (target.nodeName && target.nodeName.toLowerCase()) {
        case 'input':
        case 'textarea': {
            const nonTextElements = ['radio', 'checkbox'];
            if (nonTextElements.includes(target.type)) {
                targetValue = target.checked
                    ? target.value !== null && target.value !== 'on'
                        ? target.value
                        : true
                    : false;
            }
            else {
                targetValue = target.value;
            }
            break;
        }
        case 'select': {
            const one = target.type === 'select-one';
            if (one) {
                targetValue = target.value;
            }
            else {
                const options = Array.from(target.options);
                targetValue = [...options].filter((option) => option.selected).map((option) => option.value);
            }
            break;
        }
        default: {
            targetValue = target.value;
            break;
        }
    }
    return targetValue;
};
const useFormFields = (initialValues) => {
    const clone = { ...initialValues };
    const [formFields, setFormFields] = useState(initialValues);
    const createChangeHandler = (key) => (e) => {
        const target = e.target;
        const value = _getTargetValue(target);
        setFormFields(() => {
            formFields[key] = value;
            return formFields;
        });
    };
    const resetFormFields = () => {
        Object.assign(formFields, clone);
    };
    return [formFields, createChangeHandler, resetFormFields];
};
export { useFormFields };
