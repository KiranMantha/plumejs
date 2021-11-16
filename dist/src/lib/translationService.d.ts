export declare class TranslationService {
    private _defaultLanguage;
    setTranslate(i18n: Record<string, string>, lang: string): void;
    setDefaultLanguage(language: string): void;
    getCurrentLanguage(): string;
}
