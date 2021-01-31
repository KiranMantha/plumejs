export declare class TranslationService {
    private internalTranslationService;
    constructor();
    private defaultLanguage;
    setTranslate(i18n: object, lang: string): void;
    setDefaultLanguage(language: string): void;
    getCurrentLanguage(): string;
}
