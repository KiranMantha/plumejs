export class Validators {
  static required(value) {
    return value.length ? null : { required: true };
  }

  static min(length: number) {
    return (value) => {
      return value.length >= length ? null : { minLength: { requiredLength: length } };
    };
  }

  static max(length: number) {
    return (value) => {
      return value.length <= length ? null : { maxLength: { requiredLength: length } };
    };
  }

  static pattern(expression: string | RegExp) {
    return (value) => {
      const regex = new RegExp(expression);
      return regex.test(value) ? null : { pattern: true };
    };
  }
}
