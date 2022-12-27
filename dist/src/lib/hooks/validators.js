export class Validators {
    static required(value) {
        return value.length ? null : { required: true };
    }
    static min(length) {
        return (value) => {
            return value.length >= length ? null : { minLength: { requiredLength: length } };
        };
    }
    static max(length) {
        return (value) => {
            return value.length <= length ? null : { maxLength: { requiredLength: length } };
        };
    }
    static pattern(expression) {
        return (value) => {
            const regex = new RegExp(expression);
            return regex.test(value) ? null : { pattern: true };
        };
    }
}
