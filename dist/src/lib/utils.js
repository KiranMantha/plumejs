"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const augmentor_1 = require("augmentor");
let $object = "object", $string = "string", $function = "function", $undefined = "undefined", $number = "number";
const foreach = (collection, callback, scope = {}) => {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
        for (var prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                callback.call(scope, collection[prop], prop, collection);
            }
        }
    }
    else {
        for (var i = 0; i < collection.length; i++) {
            callback.call(scope, collection[i], i, collection);
        }
    }
};
exports.foreach = foreach;
const lookup = (obj, path, defaultValue) => {
    var value, patharr, k;
    if (path) {
        if (!isNaN(parseInt(path))) {
            return path;
        }
        patharr = path.trim().split(".");
        if (obj) {
            for (var i = 0; i < patharr.length; i++) {
                k = k ? k[patharr[i]] : obj[patharr[i]];
                if (k && !isObject(k)) {
                    value = k;
                    return value;
                }
            }
            value = k;
        }
    }
    return value || defaultValue;
};
exports.lookup = lookup;
const klass = Symbol("klass");
exports.klass = klass;
const isNumber = (value) => typeof value === $number;
exports.isNumber = isNumber;
const isArray = (value) => value instanceof Array;
exports.isArray = isArray;
const isObject = (value) => value !== null && typeof value === $object;
exports.isObject = isObject;
const isString = (value) => typeof value === $string;
exports.isString = isString;
const isFunction = (value) => typeof value === $function;
exports.isFunction = isFunction;
const isUndefined = (value) => typeof value == $undefined;
exports.isUndefined = isUndefined;
const isDefined = (value) => typeof value != $undefined;
exports.isDefined = isDefined;
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
exports.isObservable = isObservable;
const isPromise = (obj) => !!obj && typeof obj.then === "function";
exports.isPromise = isPromise;
function wrapIntoObservable(value) {
    if (isObservable(value)) {
        return value;
    }
    if (isPromise(value)) {
        return rxjs_1.from(Promise.resolve(value));
    }
    return rxjs_1.of(value);
}
exports.wrapIntoObservable = wrapIntoObservable;
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
exports.INPUT_METADATA_KEY = INPUT_METADATA_KEY;
const CSS_SHEET_NOT_SUPPORTED = (() => {
    try {
        let k = new CSSStyleSheet();
        return false;
    }
    catch (e) {
        return true;
    }
})();
exports.CSS_SHEET_NOT_SUPPORTED = CSS_SHEET_NOT_SUPPORTED;
function useFormFields(initialValues) {
    let [formFields, setFormFields] = augmentor_1.useState(initialValues);
    const createChangeHandler = (key) => (e) => {
        let target = e.target;
        const value = target.value;
        setFormFields(() => {
            formFields[key] = value;
            return formFields;
        });
    };
    return { formFields, createChangeHandler };
}
exports.useFormFields = useFormFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQTRDO0FBQzVDLHlDQUFxQztBQUVyQyxJQUFJLE9BQU8sR0FBRyxRQUFRLEVBQ3JCLE9BQU8sR0FBRyxRQUFRLEVBQ2xCLFNBQVMsR0FBRyxVQUFVLEVBQ3RCLFVBQVUsR0FBRyxXQUFXLEVBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFFcEIsTUFBTSxPQUFPLEdBQUcsQ0FDZixVQUFzQixFQUN0QixRQUFpRCxFQUNqRCxRQUFhLEVBQUUsRUFDZCxFQUFFO0lBQ0gsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssaUJBQWlCLEVBQUU7UUFDckUsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDNUIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Q7S0FDRDtTQUFNO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNuRDtLQUNEO0FBQ0YsQ0FBQyxDQUFDO0FBMkVELDBCQUFPO0FBekVSLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBZSxFQUFFLElBQVksRUFBRSxZQUFpQixFQUFFLEVBQUU7SUFDbkUsSUFBSSxLQUFL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