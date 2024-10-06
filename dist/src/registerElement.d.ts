import { ComponentDecoratorOptions, IHooks, MetadataConstructor } from './types';
declare const registerElement: (options: ComponentDecoratorOptions, target: MetadataConstructor<Partial<IHooks>>) => Promise<void>;
export { registerElement };
