import { ComponentDecoratorOptions, IHooks } from './types';
declare const registerElement: (options: ComponentDecoratorOptions, target: Partial<IHooks>) => Promise<void>;
export { registerElement };
