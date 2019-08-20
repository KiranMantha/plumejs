import { Injector } from "./service_resolver";
import { setDefaultLanguage, setTranslate } from "vanilla-i18n";
var TranslationService = (function () {
    function TranslationService() {
        this.defaultLanguage = "";
    }
    TranslationService.prototype.setTranslate = function (i18n, lang) {
        setTranslate(i18n, lang);
    };
    TranslationService.prototype.setDefaultLanguage = function (language) {
        this.defaultLanguage = language;
        setDefaultLanguage(language);
    };
    TranslationService.prototype.getCurrentLanguage = function () {
        return this.defaultLanguage;
    };
    return TranslationService;
}());
export { TranslationService };
Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=translationService.js.map