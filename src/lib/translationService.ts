import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';

@Injectable({ name: 'TranslationService' })
export class TranslationService {
  private _defaultLanguage = '';

  setTranslate(i18n: Record<string, any>, lang: string) {
    setTranslate(i18n, lang);
  }

  setDefaultLanguage(language: string) {
    this._defaultLanguage = language;
    setDefaultLanguage(language);
    const event = new CustomEvent('onLanguageChange');
    window.dispatchEvent(event);
  }

  getCurrentLanguage() {
    return this._defaultLanguage;
  }
}
