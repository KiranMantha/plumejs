import { __decorate } from "tslib";
import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';
let TranslationService = class TranslationService {
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
};
TranslationService = __decorate([
    Injectable()
], TranslationService);
export { TranslationService };
