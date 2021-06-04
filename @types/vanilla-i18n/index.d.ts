/// <reference types="node" />
declare module 'vanilla-i18n' {
  export function setDefaultLanguage(language: string): void;
  export function setTranslate(obj: any, language: string): void;
}
