import { setDefaultLanguage, setTranslate } from "vanilla-i18n";
import { Injectable } from './decorators';
import { Injector } from '../plume';

@Injectable()
export class TranslationService {
	private internalTranslationService: any;
	constructor() {
		this.internalTranslationService = Injector.get('InternalTranslationService');
	}
	private defaultLanguage: string = "";

	setTranslate(i18n: object, lang: string) {
		setTranslate(i18n, lang);
	}

	setDefaultLanguage(language: string) {
		this.defaultLanguage = language;
		setDefaultLanguage(language);
		this.internalTranslationService.updateTranslations.next();
	}

	getCurrentLanguage() {
		return this.defaultLanguage;
	}
}