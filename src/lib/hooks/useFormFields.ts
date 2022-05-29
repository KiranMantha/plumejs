interface Control {
  value: string | number | boolean | Array<string | number>;
  errors: Record<string, boolean | any>;
  validators: Array<(value: string | number | boolean | Array<string | number>) => Record<string, any> | null>;
}

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

class Form {
  private _initialValues: Record<string, any>;
  private _controls: Record<string, Control>;
  private _errors = new Map<string, Record<string, any>>();

  constructor(initialValues: Record<string, any>, controls: Record<string, Control>) {
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

  get(controlName: string): Control {
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
            this._errors.set(key, { ...this._errors.get(key), ...validity });
            this._controls[key].errors = {
              ...this._controls[key].errors,
              ...validity
            };
          } else {
            this._errors.set(key, validity);
            this._controls[key].errors = validity;
          }
        }
      }
    }
  }

  reset(obj: Record<string, any> = {}) {
    for (const key in this._controls) {
      this._controls[key].value = obj[key] || this._initialValues[key];
    }
    this._errors.clear();
  }
}

const useFormFields = <T extends Record<string, any>>(
  initialValues: T
): [Form, (key: keyof T) => (e: Event) => void, () => void] => {
  const controls: Record<string, Control> = {};
  const clonedValues: Record<string, any> = {};
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
  const createChangeHandler = (key: keyof T) => (e: any) => {
    const value = _getTargetValue(e.target);
    form.get(key as string).value = value;
  };
  const resetFormFields = () => {
    form.reset();
  };

  return [form, createChangeHandler, resetFormFields];
};

export { Form, useFormFields };
