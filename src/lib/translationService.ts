import { setDefaultLanguage, setTranslate } from "vanilla-i18n";

export class TranslationService {
	private defaultLanguage: string = "";

	setTranslate(i18n: object, lang: string) {
		setTranslate(i18n, lang);
	}

	setDefaultLanguage(language: string) {
		this.defaultLanguage = language;
		setDefaultLanguage(language);
		let iterator = InternalTranslationService.translationComponents.entries();
		let result = iterator.next();
		while (!result.done) {
			let component: HTMLElement = result.value[0];
			let tagname: string = result.value[1];
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
	static translationComponents = new Map();
}
