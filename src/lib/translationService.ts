import { setDefaultLanguage, setTranslate } from "vanilla-i18n";
import { Injectable } from './decorators';

@Injectable()
export class TranslationService {
	private defaultLanguage: string = "";

	setTranslate(i18n: object, lang: string) {
		setTranslate(i18n, lang);
	}

	setDefaultLanguage(language: string) {
		this.defaultLanguage = language;
		setDefaultLanguage(language);
		let event = new CustomEvent<any>('onLanguageChange');
		window.dispatchEvent(event);
	}

	getCurrentLanguage() {
		return this.defaultLanguage;
	}
}