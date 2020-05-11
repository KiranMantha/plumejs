import { jsonObject } from "./types";
import { Observable, from, of } from "rxjs";

let $object = "object",
	$string = "string",
	$function = "function",
	$undefined = "undefined",
	$number = "number";
//foreach for arrays, collections, objects
const foreach = (
	collection: Array<any>,
	callback: (o: any, i: any, c: Array<any>) => void,
	scope: any = {}
) => {
	if (Object.prototype.toString.call(collection) === "[object Object]") {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection);
			}
		}
	} else {
		for (var i = 0; i < collection.length; i++) {
			callback.call(scope, collection[i], i, collection);
		}
	}
};

const lookup = (obj: jsonObject, path: string, defaultValue: any) => {
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

const klass = Symbol("klass");
const isNumber = (value: any) => typeof value === $number;
const isArray = (value: any) => value instanceof Array;
const isObject = (value: any) => value !== null && typeof value === $object;
const isString = (value: any) => typeof value === $string;
const isFunction = (value: any) => typeof value === $function;
const isUndefined = (value: any) => typeof value == $undefined;
const isDefined = (value: any) => typeof value != $undefined;
const isObservable = (obj: any | Observable<any>): obj is Observable<any> =>
	!!obj && typeof obj.subscribe === "function";
const isPromise = (obj: any): obj is Promise<any> =>
	!!obj && typeof obj.then === "function";
function wrapIntoObservable<T>(
	value: T | Promise<T> | Observable<T>
): Observable<T> {
	if (isObservable(value)) {
		return value;
	}

	if (isPromise(value)) {
		// Use `Promise.resolve()` to wrap promise-like instances.
		// Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
		// change detection.
		return from(Promise.resolve(value));
	}

	return of(value);
}
const INPUT_METADATA_KEY = Symbol("design:inputTypes");
const CSS_SHEET_NOT_SUPPORTED = (() => {
	try {
		let k = new CSSStyleSheet();
		return false;
	} catch (e) {
		return true;
	}
})();

export {
	foreach,
	isNumber,
	lookup,
	isArray,
	isObject,
	isString,
	isFunction,
	isUndefined,
	isDefined,
	isObservable,
	isPromise,
	wrapIntoObservable,
	klass,
  INPUT_METADATA_KEY,
  CSS_SHEET_NOT_SUPPORTED
};
