export declare class TranslationService {
    private defaultLanguage;
    setTranslate(i18n: object, lang: string): void;
    setDefaultLanguage(language: string): void;
    getCurrentLanguage(): string;
}
export declare class InternalTranslationService {
    static translationComponents: Map<any, any>;
}
