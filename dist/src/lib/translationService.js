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
        let components = InternalTranslationService.translationComponents;
        if (components.length > 0) {
            components.forEach((ele) => {
                if (ele.nodeName !== 'ROUTER-OUTLET') {
                    ele.update();
                }
            });
        }
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
}
exports.TranslationService = TranslationService;
class InternalTranslationService {
}
InternalTranslationService.translationComponents = [];
exports.InternalTranslationService = InternalTranslationService;
service_resolver_1.Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=translationService.js.map