import { DecoratorOptions } from "./types";
declare const registerElement: (options: DecoratorOptions, target: Function, providers: string[], isRoot: boolean, isUnitTestEnv?: boolean) => void;
export { registerElement };
