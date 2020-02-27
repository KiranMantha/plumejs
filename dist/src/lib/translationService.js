"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vanilla_i18n_1 = require("vanilla-i18n");
var TranslationService = /** @class */ (function () {
    function TranslationService() {
        this.defaultLanguage = "";
    }
    TranslationService.prototype.setTranslate = function (i18n, lang) {
        vanilla_i18n_1.setTranslate(i18n, lang);
    };
    TranslationService.prototype.setDefaultLanguage = function (language) {
        this.defaultLanguage = language;
        vanilla_i18n_1.setDefaultLanguage(language);
        var iterator = InternalTranslationService.translationComponents.entries();
        var result = iterator.next();
        while (!result.done) {
            var component = result.value[0];
            var tagname = result.value[1];
            if (tagname !== "router-outlet") {
                component.update();
            }
            result = iterator.next();
        }
    };
    TranslationService.prototype.getCurrentLanguage = function () {
        return this.defaultLanguage;
    };
    return TranslationService;
}());
exports.TranslationService = TranslationService;
var InternalTranslationService = /** @class */ (function () {
    function InternalTranslationService() {
    }
    InternalTranslationService.translationComponents = new Map();
    return InternalTranslationService;
}());
exports.InternalTranslationService = InternalTranslationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBZ0U7QUFFaEU7SUFBQTtRQUNTLG9CQUFlLEdBQVcsRUFBRSxDQUFDO0lBd0J0QyxDQUFDO0lBdEJBLHlDQUFZLEdBQVosVUFBYSxJQUFZLEVBQUUsSUFBWTtRQUN0QywyQkFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0NBQWtCLEdBQWxCLFVBQW1CLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLGlDQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLFNBQVMsR0FBZ0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxLQUFLLGVBQWUsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNGLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFDQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDN0IsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxnREFBa0I7QUEyQi9CO0lBQUE7SUFFQSxDQUFDO0lBRE8sZ0RBQXFCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUMxQyxpQ0FBQztDQUFBLEFBRkQsSUFFQztBQUZZLGdFQUEwQiJ9