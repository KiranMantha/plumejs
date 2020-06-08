"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vanilla_i18n_1 = require("vanilla-i18n");
const decorators_1 = require("./decorators");
const internalTranslationService_1 = require("./internalTranslationService");
let TranslationService = class TranslationService {
    constructor() {
        this.defaultLanguage = "";
    }
    setTranslate(i18n, lang) {
        vanilla_i18n_1.setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        vanilla_i18n_1.setDefaultLanguage(language);
        let iterator = internalTranslationService_1.InternalTranslationService.translationComponents.entries();
        let result = iterator.next();
        while (!result.done) {
            let component = result.value[0];
            let tagname = result.value[1];
            if (tagname !== "router-outlet") {
                component.update();
            }
            result = iterator.next();
        }
    }
    getCurrentLanguage() {
        return this.defaultLanguage;
    }
};
TranslationService = tslib_1.__decorate([
    decorators_1.Injectable()
], TranslationService);
exports.TranslationService = TranslationService;
