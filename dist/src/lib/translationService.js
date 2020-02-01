"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        let iterator = InternalTranslationService.translationComponents.entries();
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
}
exports.TranslationService = TranslationService;
class InternalTranslationService {
}
exports.InternalTranslationService = InternalTranslationService;
InternalTranslationService.translationComponents = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBZ0U7QUFFaEUsTUFBYSxrQkFBa0I7SUFBL0I7UUFDUyxvQkFBZSxHQUFXLEVBQUUsQ0FBQztJQXdCdEMsQ0FBQztJQXRCQSxZQUFZLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDdEMsMkJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLGlDQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLFNBQVMsR0FBZ0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxLQUFLLGVBQWUsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzdCLENBQUM7Q0FDRDtBQXpCRCxnREF5QkM7QUFFRCxNQUFhLDBCQUEwQjs7QUFBdkMsZ0VBRUM7QUFETyxnREFBcUIsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDIn0=