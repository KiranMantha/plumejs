import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';
export class TranslationService {
    defaultLanguage = '';
    setTranslate(i18n, lang) {
        setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        setDefaultLanguage(language);
        const event = new CustomEvent('onLanguageChange');
        window.dispatchEvent(event);
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
}
Injectable("TranslationService")([TranslationService]);
