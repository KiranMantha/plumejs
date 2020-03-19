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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQWdFO0FBQ2hFLDZDQUEwQztBQUMxQyw2RUFBMEU7QUFHMUUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFBL0I7UUFDUyxvQkFBZSxHQUFXLEVBQUUsQ0FBQztJQXdCdEMsQ0FBQztJQXRCQSxZQUFZLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDdEMsMkJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLGlDQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLHVEQUEwQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLFNBQVMsR0FBZ0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxLQUFLLGVBQWUsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzdCLENBQUM7Q0FDRCxDQUFBO0FBekJZLGtCQUFrQjtJQUQ5Qix1QkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBeUI5QjtBQXpCWSxnREFBa0IifQ==