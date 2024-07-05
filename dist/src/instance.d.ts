import { ConstructorType, Renderer } from './types';
declare const instantiate: <T>(klass: ConstructorType<T>, dependencies: ConstructorType<unknown>[], rendererInstance?: Renderer) => T;
export { instantiate };
