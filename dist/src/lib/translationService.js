"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
const vanilla_i18n_1 = require("vanilla-i18n");
class TranslationService {
    constructor() {
        this.defaultLanguage = "";
    }
    setTranslate(i18n, lang) {
        vanilla_i18n_1.setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        vanilla_i18n_1.setDefaultLanguage(language);
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
}
exports.TranslationService = TranslationService;
service_resolver_1.Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=translationService.js.map