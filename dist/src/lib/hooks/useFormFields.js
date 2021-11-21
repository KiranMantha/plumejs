"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormFields = void 0;
const useState_1 = require("./useState");
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
    const [formFields, setFormFields] = (0, useState_1.useState)(initialValues);
    const createChangeHandler = (key) => (e) => {
        const target = e.target;
        const value = _getTargetValue(target);
        setFormFields(() => {
            formFields[key] = value;
            return formFields;
        });
    };
    const resetFormFields = () => {
        for (const key of Object.keys(formFields)) {
            formFields[key] = '';
        }
    };
    return [formFields, createChangeHandler, resetFormFields];
};
exports.useFormFields = useFormFields;
