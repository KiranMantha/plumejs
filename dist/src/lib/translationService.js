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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBZ0U7QUFFaEUsTUFBYSxrQkFBa0I7SUFBL0I7UUFDUyxvQkFBZSxHQUFXLEVBQUUsQ0FBQztJQXNCdEMsQ0FBQztJQXBCQSxZQUFZLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDdEMsMkJBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLGlDQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksVUFBVSxHQUFHLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDO1FBQ2xFLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWdCLEVBQUUsRUFBRTtnQkFDdkMsSUFBRyxHQUFHLENBQUMsUUFBUSxLQUFLLGVBQWUsRUFBRTtvQkFDcEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNiO1lBQ0YsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzdCLENBQUM7Q0FDRDtBQXZCRCxnREF1QkM7QUFFRCxNQUFhLDBCQUEwQjs7QUFBdkMsZ0VBRUM7QUFETyxnREFBcUIsR0FBdUIsRUFBRSxDQUFDIn0=