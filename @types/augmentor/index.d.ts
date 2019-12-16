/// <reference types="node" />
// will be removed once neverland has @types

type MutableRefObject <T> = { current: T; };
type RefObject <T> = { current: T | null; };
type TemplateFunction<T> = (template: TemplateStringsArray, ...values: any[]) => T;
interface Tag<T> extends TemplateFunction<any> {
  for: (object: object, id?: string) => Tag<T>;
}

declare module 'augmentor' {
  function useRef <T> (initialValue: T): MutableRefObject<T>;
  function useRef <T> (initialValue: T | null): RefObject<T>;
  function useRef <T = undefined> (): MutableRefObject<T | undefined>;
  function render(node: HTMLElement, renderer: () => any): any;
  function augmentor(args:any):any;
  export const html: Tag<HTMLElement>;  
}