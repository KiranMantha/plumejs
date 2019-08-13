/// <reference types="node" />
// will be removed once watchjs has @types
declare module 'vanilla-i18n' {
  export function setDefaultLanguage(language:string):void;
  export function setTranslate(obj:any, language:string):void;
}