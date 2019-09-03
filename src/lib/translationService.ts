import { Injector } from "./service_resolver";
import { setDefaultLanguage, setTranslate } from "vanilla-i18n";

export class TranslationService {
	private defaultLanguage: string = "";

	setTranslate(i18n: object, lang: string) {
		setTranslate(i18n, lang);
	}

	setDefaultLanguage(language: string) {
		this.defaultLanguage = language;
		setDefaultLanguage(language);
		let components = InternalTranslationService.translationComponents;
		if (components.length > 0) {
			components.forEach((ele: any) => {
				if(ele.nodeName !== 'ROUTER-OUTLET') {
					ele.update();
				}
			});
		}
	}

	getCurrentLanguage() {
		return this.defaultLanguage;
	}
}

export class InternalTranslationService {
	static translationComponents: Array<HTMLElement> = [];
}

Injector.register("TranslationService", new TranslationService());
