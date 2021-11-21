import { Renderer } from './types';
declare const instantiate: (klass: any, dependencies: string[], rendererInstance?: Renderer) => Record<string, any>;
export { instantiate };
