import { MetadataConstructor, Renderer } from './types';
declare const instantiate: <T>(klass: MetadataConstructor<T>, dependencies: MetadataConstructor<unknown>[], rendererInstance?: Renderer) => T;
export { instantiate };
