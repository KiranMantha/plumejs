"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_resolver_1 = require("./service_resolver");
var vanilla_i18n_1 = require("vanilla-i18n");
var TranslationService = (function () {
    function TranslationService() {
        this.defaultLanguage = "";
    }
    TranslationService.prototype.setTranslate = function (i18n, lang) {
        vanilla_i18n_1.setTranslate(i18n, lang);
    };
    TranslationService.prototype.setDefaultLanguage = function (language) {
        this.defaultLanguage = language;
        vanilla_i18n_1.setDefaultLanguage(language);
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
exports.TranslationService = TranslationService;
var InternalTranslationService = (function () {
    function InternalTranslationService() {
    }
    InternalTranslationService.translationComponents = [];
    return InternalTranslationService;
}());
exports.InternalTranslationService = InternalTranslationService;
service_resolver_1.Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBOEM7QUFDOUMsNkNBQWdFO0FBRWhFO0lBQUE7UUFDUyxvQkFBZSxHQUFXLEVBQUUsQ0FBQztJQXNCdEMsQ0FBQztJQXBCQSx5Q0FBWSxHQUFaLFVBQWEsSUFBWSxFQUFFLElBQVk7UUFDdEMsMkJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELCtDQUFrQixHQUFsQixVQUFtQixRQUFnQjtRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNoQyxpQ0FBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLFVBQVUsR0FBRywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFnQjtnQkFDbkMsSUFBRyxHQUFHLENBQUMsUUFBUSxLQUFLLGVBQWUsRUFBRTtvQkFDcEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNiO1lBQ0YsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFDQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDN0IsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxnREFBa0I7QUF5Qi9CO0lBQUE7SUFFQSxDQUFDO0lBRE8sZ0RBQXFCLEdBQXVCLEVBQUUsQ0FBQztJQUN2RCxpQ0FBQztDQUFBLEFBRkQsSUFFQztBQUZZLGdFQUEwQjtBQUl2QywyQkFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQyJ9