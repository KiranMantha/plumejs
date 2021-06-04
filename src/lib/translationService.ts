import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';
import { jsonObject } from './types';

@Injectable()
export class TranslationService {
  private defaultLanguage = '';

  setTranslate(i18n: jsonObject, lang: string) {
    setTranslate(i18n, lang);
  }

  setDefaultLanguage(language: string) {
    this.defaultLanguage = language;
    setDefaultLanguage(language);
    const event = new CustomEvent<any>('onLanguageChange');
    window.dispatchEvent(event);
  }

  getCurrentLanguage() {
    return this.defaultLanguage;
  }
}
