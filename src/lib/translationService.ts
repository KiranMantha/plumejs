import { Injector } from "./service_resolver";
import { lookup, isObject, isString } from "./utils";

export class TranslationService {
	private defaultLanguage = "pt";
	private objTranslate: any = {};

	constructor() {
		this.init();
	}

	setTranslate = (i18n: object, lang: string) => {
		if (!lang) lang = this.defaultLanguage;
		if (!this.objTranslate[lang]) this.objTranslate[lang] = {};
		Object.assign(this.objTranslate[lang], i18n);
	};

	private init() {
		let _this = this;
		Object.assign(String.prototype, {
			translate: function(...args: any) {
				let lang = null;
				let values: any = {};
				let i18n: any = null;
				if (args.length > 0) {
					if (args[0] && isString(args[0])) lang = args[0];
					if (args[0] && isObject(args[0])) values = args[0];
					if (args[1] && isObject(args[1])) values = args[1];
				}

				if (!lang) lang = _this.defaultLanguage;
				const languages: any = _this.objTranslate[lang] || {};

				i18n = languages.hasOwnProperty(this) ? languages["" + this] : null;
				const emptyI18N = i18n === null;

				if (emptyI18N) {
					let t = "" + this;
					const withVarNum = t.match(/(\[\d+])/g);
					const withVarStr = t.match(/(\[\w+])/g);
					if (withVarNum) t = t.replace(/(\[\d+])/g, "[:num]");
					if (withVarStr) t = t.replace(/(\[\w+])/g, "[:str]");

					i18n = lookup(languages, "" + this, "");
					const hasI18N = i18n !== null;

					if (hasI18N) {
						if (withVarNum) {
							withVarNum.forEach((val, index) => {
								i18n = i18n.replace(
									`{$${index + 1}+2}`,
									parseInt(val.match(/\d+/g) + "", 10) + 2
								);
								i18n = i18n.replace(
									`{$${index + 1}+1}`,
									parseInt(val.match(/\d+/g) + "", 10) + 1
								);
								i18n = i18n.replace(`$${index + 1}`, val.match(/\d+/g));
							});
						}

						if (withVarStr) {
							withVarStr.forEach((val, index) => {
								const rg = new RegExp(`$${index}`, "g");
								i18n = i18n.replace(rg, val.match(/\w+/g));
							});
						}
					}
				}

				if (values) {
					i18n = i18n.replace(
						/\{\s?([\w.]+)\s?\}/g,
						(match: any, variable: string) => {
							let prop = variable.trim();
							return values[prop] || prop;
						}
					);
				}

				return i18n === null ? this : i18n;
			}
		});
	}

	getCurrentLanguage = (): string => {
		return this.defaultLanguage;
	};

	setDefaultLanguage = (lang: string) => {
		this.defaultLanguage = lang;
	};
}

Injector.register("TranslationService", new TranslationService());
