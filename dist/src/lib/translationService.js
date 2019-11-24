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
exports.InternalTranslationService = InternalTranslationService;
InternalTranslationService.translationComponents = [];
service_resolver_1.Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBOEM7QUFDOUMsK0NBQWdFO0FBRWhFLE1BQWEsa0JBQWtCO0lBQS9CO1FBQ1Msb0JBQWUsR0FBVyxFQUFFLENBQUM7SUFzQnRDLENBQUM7SUFwQkEsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3RDLDJCQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxRQUFnQjtRQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUNoQyxpQ0FBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLFVBQVUsR0FBRywwQkFBMEIsQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFnQixFQUFFLEVBQUU7Z0JBQ3ZDLElBQUcsR0FBRyxDQUFDLFFBQVEsS0FBSyxlQUFlLEVBQUU7b0JBQ3BDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDYjtZQUNGLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM3QixDQUFDO0NBQ0Q7QUF2QkQsZ0RBdUJDO0FBRUQsTUFBYSwwQkFBMEI7O0FBQXZDLGdFQUVDO0FBRE8sZ0RBQXFCLEdBQXVCLEVBQUUsQ0FBQztBQUd2RCwyQkFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQyJ9