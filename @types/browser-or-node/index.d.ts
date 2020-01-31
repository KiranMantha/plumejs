/// <reference types="node" />
declare module 'browser-or-node' {
  export const isBrowser:boolean;
  export const isNode:boolean;
  export const isWebWorker:boolean;
}