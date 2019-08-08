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
	}

	getCurrentLanguage() {
		return this.defaultLanguage;
	}
}

Injector.register("TranslationService", new TranslationService());
