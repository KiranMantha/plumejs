var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
