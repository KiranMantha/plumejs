import { jsonObject } from './types';
export declare class TranslationService {
    private _defaultLanguage;
    setTranslate(i18n: jsonObject, lang: string): void;
    setDefaultLanguage(language: string): void;
    getCurrentLanguage(): string;
}
