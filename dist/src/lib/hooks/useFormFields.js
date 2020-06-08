"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const augmentor_1 = require("augmentor");
const getTargetValue = (target) => {
    let targetValue;
    switch (target.nodeName && target.nodeName.toLowerCase()) {
        case "input":
        case "textarea": {
            let nonTextElements = ["radio", "checkbox"];
            if (nonTextElements.includes(target.type)) {
                targetValue = target.checked
                    ? target.value !== null && target.value !== "on"
                        ? target.value
                        : true
                    : false;
            }
            else {
                targetValue = target.value;
            }
            break;
        }
        case "select": {
            let one = target.type === "select-one";
            if (one) {
                targetValue = target.value;
            }
            else {
                let options = Array.apply(null, target.options);
                targetValue = [...options]
                    .filter((option) => option.selected)
                    .map((option) => option.value);
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
function useFormFields(initialValues) {
    let [formFields, setFormFields] = augmentor_1.useState(initialValues);
    const createChangeHandler = (key) => (e) => {
        let target = e.target;
        const value = getTargetValue(target);
        setFormFields(() => {
            formFields[key] = value;
            return formFields;
        });
    };
    return { formFields, createChangeHandler };
}
exports.useFormFields = useFormFields;
