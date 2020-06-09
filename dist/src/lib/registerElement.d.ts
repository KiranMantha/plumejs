import { DecoratorOptions } from "./types";
declare const registerElement: (options: DecoratorOptions, target: Function, providers: Array<string>, isRoot: boolean) => void;
export { registerElement };
