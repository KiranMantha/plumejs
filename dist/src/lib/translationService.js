import { setDefaultLanguage, setTranslate } from "vanilla-i18n";
export class TranslationService {
    constructor() {
        this.defaultLanguage = "";
    }
    setTranslate(i18n, lang) {
        setTranslate(i18n, lang);
    }
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
        setDefaultLanguage(language);
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
export class InternalTranslationService {
}
InternalTranslationService.translationComponents = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90cmFuc2xhdGlvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRSxNQUFNLE9BQU8sa0JBQWtCO0lBQS9CO1FBQ1Msb0JBQWUsR0FBVyxFQUFFLENBQUM7SUF3QnRDLENBQUM7SUF0QkEsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFFLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLFNBQVMsR0FBZ0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksT0FBTyxLQUFLLGVBQWUsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzdCLENBQUM7Q0FDRDtBQUVELE1BQU0sT0FBTywwQkFBMEI7O0FBQy9CLGdEQUFxQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUMifQ==