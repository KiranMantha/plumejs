"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const tslib_1 = require("tslib");
const vanilla_i18n_1 = require("vanilla-i18n");
const decorators_1 = require("./decorators");
let TranslationService = class TranslationService {
    _defaultLanguage = '';
    setTranslate(i18n, lang) {
        (0, vanilla_i18n_1.setTranslate)(i18n, lang);
    }
    setDefaultLanguage(language) {
        this._defaultLanguage = language;
        (0, vanilla_i18n_1.setDefaultLanguage)(language);
        const event = new CustomEvent('onLanguageChange');
        window.dispatchEvent(event);
    }
    getCurrentLanguage() {
        return this._defaultLanguage;
    }
};
TranslationService = (0, tslib_1.__decorate)([
    (0, decorators_1.Injectable)()
], TranslationService);
exports.TranslationService = TranslationService;
