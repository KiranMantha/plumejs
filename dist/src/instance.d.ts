import { ConstructorType, Renderer } from './types';
declare const instantiate: (klass: ConstructorType<any>, dependencies: ConstructorType<any>[], rendererInstance?: Renderer) => Record<string, any>;
export { instantiate };
