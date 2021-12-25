import { useState } from './useState';

const _getTargetValue = (target: HTMLElement) => {
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
      const options = Array.from((target as HTMLSelectElement).options);
      const value = [...options]
        .filter((option) => option.selected)
        .map((option) => option.value ?? (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(' '));
      targetValue = one ? value[0] : value;
      break;
    }
    default: {
      targetValue = (target as any).value;
      break;
    }
  }
  return targetValue;
};

const useFormFields = <T extends Record<string, any>>(
  initialValues: T
): [T, (key: keyof T) => (e: Event) => void, () => void] => {
  const clone: Record<string, any> = { ...initialValues };
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key: keyof T) => (e: Event) => {
    const target: any = e.target;
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
