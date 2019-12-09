import { jsonObject } from "./types";
declare const foreach: (collection: any[], callback: (o: any, i: any, c: any[]) => void, scope?: any) => void;
declare const lookup: (obj: jsonObject, path: string, defaultValue: any) => any;
declare const klass: unique symbol;
declare const isNumber: (value: any) => boolean;
declare const isArray: (value: any) => boolean;
declare const isObject: (value: any) => boolean;
declare const isString: (value: any) => boolean;
declare const isFunction: (value: any) => boolean;
declare const isUndefined: (value: any) => boolean;
declare const isDefined: (value: any) => boolean;
declare const INPUT_METADATA_KEY: unique symbol;
export { foreach, isNumber, lookup, isArray, isObject, isString, isFunction, isUndefined, isDefined, klass, INPUT_METADATA_KEY };
