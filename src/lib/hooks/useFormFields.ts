import { jsonObject } from '../types';
import { useState } from '../utils';

const getTargetValue = (target: HTMLElement) => {
  let targetValue;
  switch (target.nodeName && target.nodeName.toLowerCase()) {
    case 'input':
    case 'textarea': {
      const nonTextElements = ['radio', 'checkbox'];
      if (nonTextElements.includes((target as HTMLInputElement).type)) {
        targetValue = (target as HTMLInputElement).checked
          ? (target as HTMLInputElement).value !== null && (target as HTMLInputElement).value !== 'on'
            ? (target as HTMLInputElement).value
            : true
          : false;
      } else {
        targetValue = (target as HTMLInputElement).value;
      }
      break;
    }
    case 'select': {
      const one = (target as HTMLSelectElement).type === 'select-one';
      if (one) {
        targetValue = (target as HTMLSelectElement).value;
      } else {
        const options = Array.from((target as HTMLSelectElement).options);
        targetValue = [...options].filter((option) => option.selected).map((option) => option.value);
      }
      break;
    }
    default: {
      targetValue = (target as any).value;
      break;
    }
  }
  return targetValue;
};

const useFormFields = (
  initialValues: jsonObject
): { formFields: jsonObject; createChangeHandler: (key: string) => (e: Event) => void } => {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key: string) => (e: Event) => {
    const target: any = e.target;
    const value = getTargetValue(target);
    setFormFields(() => {
      formFields[key] = value;
      return formFields;
    });
  };
  return { formFields, createChangeHandler };
};

export { useFormFields };
