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
        var components = InternalTranslationService.translationComponents;
        if (components.length > 0) {
            components.forEach(function (ele) {
                if (ele.nodeName !== 'ROUTER-OUTLET') {
                    ele.update();
                }
            });
        }
    };
    TranslationService.prototype.getCurrentLanguage = function () {
        return this.defaultLanguage;
    };
    return TranslationService;
}());
export { TranslationService };
var InternalTranslationService = (function () {
    function InternalTranslationService() {
    }
    InternalTranslationService.translationComponents = [];
    return InternalTranslationService;
}());
export { InternalTranslationService };
Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=translationService.js.map