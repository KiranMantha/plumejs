/// <reference types="node" />
// will be removed once augmentor has @types

type MutableRefObject <T> = { current: T; };
type RefObject <T> = { current: T | null; };
type TemplateFunction<T> = (template: TemplateStringsArray, ...values: any[]) => T;
interface Tag<T> extends TemplateFunction<any> {
  for: (object: object, id?: string) => Tag<T>;
}
type useStateType<T> = [T, (T) => any];

declare module 'augmentor' {
  function useRef <T> (initialValue: T): MutableRefObject<T>;
  function useRef <T> (initialValue: T | null): RefObject<T>;
  function useRef <T = undefined> (): MutableRefObject<T | undefined>;
  function useRef <T = undefined> (): any;
  function useState<T>(initialValue: T): useStateType<T>;
  function useState<T>(initialValue: T | null): useStateType<T>;
  function useState<T = undefined>(): useStateType<T | undefined>;
  function useContext():any;
  function useContext<T>(context: T): T;
  function createContext<T>(defaultValue: T): T;
  function render(node: HTMLElement, renderer: () => any): any;
  function augmentor(args:any):any;
}