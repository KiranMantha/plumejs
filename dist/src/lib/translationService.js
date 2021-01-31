"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const tslib_1 = require("tslib");
const vanilla_i18n_1 = require("vanilla-i18n");
const decorators_1 = require("./decorators");
const plume_1 = require("../plume");
let TranslationService = class TranslationService {
    constructor() {
        this.defaultLanguage = "";
        this.internalTranslationService = plume_1.Injector.get('InternalTranslationService');
    }
    setTranslate(i18n, lang) {
        vanilla_i18n_1.setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        vanilla_i18n_1.setDefaultLanguage(language);
        this.internalTranslationService.updateTranslations.next();
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
};
TranslationService = tslib_1.__decorate([
    decorators_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TranslationService);
exports.TranslationService = TranslationService;
