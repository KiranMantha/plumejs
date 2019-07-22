/// <reference types="node" />
// will be removed once watchjs has @types
declare module 'melanke-watchjs' {
  import watchjs from "melanke-watchjs";
  export function watch(obj:any, key: string | Array<string>, callback:Function):void;
  export function unwatch(obj:any, key:string | Array<string>):void;
}