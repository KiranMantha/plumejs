import { Renderer, ConstructorType } from './types';
declare const instantiate: (klass: any, dependencies: ConstructorType<any>[], rendererInstance?: Renderer) => Record<string, any>;
export { instantiate };
