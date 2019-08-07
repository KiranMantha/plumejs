export declare class TranslationService {
    private defaultLanguage;
    private objTranslate;
    constructor();
    setTranslate: (i18n: object, lang: string) => void;
    private init;
    getCurrentLanguage: () => string;
    setDefaultLanguage: (lang: string) => void;
}
