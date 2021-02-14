import { Observable } from "rxjs";
import { jsonObject } from "./types";
declare const foreach: (collection: Array<any>, callback: (o: any, i: any, c: Array<any>) => void, scope?: any) => void;
declare const lookup: (obj: jsonObject, path: string, defaultValue: any) => any;
declare const klass: unique symbol;
declare const isNumber: (value: any) => boolean;
declare const isArray: (value: any) => boolean;
declare const isObject: (value: any) => boolean;
declare const isString: (value: any) => boolean;
declare const isFunction: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;
declare const isDefined: (value: any) => boolean;
declare const isObservable: (obj: any | Observable<any>) => obj is Observable<any>;
declare const isPromise: (obj: any) => obj is Promise<any>;
declare function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T>;
declare const INPUT_METADATA_KEY: unique symbol;
declare const CSS_SHEET_NOT_SUPPORTED: boolean;
export { foreach, isNumber, lookup, isArray, isObject, isString, isFunction, isUndefined, isDefined, isObservable, isPromise, wrapIntoObservable, klass, INPUT_METADATA_KEY, CSS_SHEET_NOT_SUPPORTED };
