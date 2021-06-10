import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';
export class TranslationService {
    _defaultLanguage = '';
    setTranslate(i18n, lang) {
        setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this._defaultLanguage = language;
        setDefaultLanguage(language);
        const event = new CustomEvent('onLanguageChange');
        window.dispatchEvent(event);
    }
    getCurrentLanguage() {
        return this._defaultLanguage;
    }
}
Injectable("TranslationService")([TranslationService]);
