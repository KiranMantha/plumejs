import { setDefaultLanguage, setTranslate } from "vanilla-i18n";
import { Injectable } from './decorators';
export class TranslationService {
    constructor() {
        this.defaultLanguage = "";
    }
    setTranslate(i18n, lang) {
        setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        setDefaultLanguage(language);
        let event = new CustomEvent('onLanguageChange');
        window.dispatchEvent(event);
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
}
Injectable("TranslationService")([TranslationService]);
