"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormFields = exports.Form = void 0;
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
            const options = Array.from(target.options);
            const value = [...options]
                .filter((option) => option.selected)
                .map((option) => { var _a; return (_a = option.value) !== null && _a !== void 0 ? _a : (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(' '); });
            targetValue = one ? value[0] : value;
            break;
        }
        default: {
            targetValue = target.value;
            break;
        }
    }
    return targetValue;
};
class Form {
    constructor(initialValues, controls) {
        this._errors = new Map();
        this._initialValues = initialValues;
        this._controls = controls;
    }
    get errors() {
        return this._errors;
    }
    get valid() {
        this.checkValidity();
        return this._errors.size ? false : true;
    }
    get value() {
        const values = {};
        for (const [key, value] of Object.entries(this._controls)) {
            values[key] = value.value;
        }
        return values;
    }
    get(controlName) {
        return this._controls[controlName];
    }
    checkValidity() {
        this._errors.clear();
        for (const key in this._controls) {
            const value = this._controls[key].value;
            const validators = this._controls[key].validators;
            this._controls[key].errors = null;
            for (const validator of validators) {
                const validity = validator(value);
                if (validity !== null) {
                    if (this._errors.has(key)) {
                        this._errors.set(key, Object.assign(Object.assign({}, this._errors.get(key)), validity));
                        this._controls[key].errors = Object.assign(Object.assign({}, this._controls[key].errors), validity);
                    }
                    else {
                        this._errors.set(key, validity);
                        this._controls[key].errors = validity;
                    }
                }
            }
        }
    }
    reset(obj = {}) {
        for (const key in this._controls) {
            this._controls[key].value = obj[key] || this._initialValues[key];
        }
        this._errors.clear();
    }
}
exports.Form = Form;
const useFormFields = (initialValues) => {
    const controls = {};
    const clonedValues = {};
    for (const [key, value] of Object.entries(initialValues)) {
        const val = Array.isArray(value) ? value : [value];
        controls[key] = {
            value: val.shift(),
            validators: val,
            errors: null
        };
        clonedValues[key] = controls[key].value;
    }
    const form = new Form(clonedValues, controls);
    const createChangeHandler = (key) => (e) => {
        const value = _getTargetValue(e.target);
        form.get(key).value = value;
    };
    const resetFormFields = () => {
        form.reset();
    };
    return [form, createChangeHandler, resetFormFields];
};
exports.useFormFields = useFormFields;
