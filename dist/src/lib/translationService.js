"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
const utils_1 = require("./utils");
class TranslationService {
    constructor() {
        this.defaultLanguage = "pt";
        this.objTranslate = {};
        this.setTranslate = (i18n, lang) => {
            if (!lang)
                lang = this.defaultLanguage;
            if (!this.objTranslate[lang])
                this.objTranslate[lang] = {};
            Object.assign(this.objTranslate[lang], i18n);
        };
        this.getCurrentLanguage = () => {
            return this.defaultLanguage;
        };
        this.setDefaultLanguage = (lang) => {
            this.defaultLanguage = lang;
        };
        this.init();
    }
    init() {
        let _this = this;
        String.prototype.translate = function (...args) {
            let str = String(this);
            let lang = null;
            let values = {};
            let i18n = null;
            if (args.length > 0) {
                if (args[0] && utils_1.isString(args[0]))
                    lang = args[0];
                if (args[0] && utils_1.isObject(args[0]))
                    values = args[0];
                if (args[1] && utils_1.isObject(args[1]))
                    values = args[1];
            }
            if (!lang)
                lang = _this.defaultLanguage;
            const languages = _this.objTranslate[lang] || {};
            i18n = languages.hasOwnProperty(str) ? languages[str] : null;
            const emptyI18N = i18n === null;
            if (emptyI18N) {
                const withVarNum = str.match(/(\[\d+])/g);
                const withVarStr = str.match(/(\[\w+])/g);
                if (withVarNum)
                    str = str.replace(/(\[\d+])/g, "[:num]");
                if (withVarStr)
                    str = str.replace(/(\[\w+])/g, "[:str]");
                i18n = utils_1.lookup(languages, str, "");
                const hasI18N = i18n !== null;
                if (hasI18N) {
                    if (withVarNum) {
                        withVarNum.forEach((val, index) => {
                            i18n = i18n.replace(`{$${index + 1}+2}`, parseInt(val.match(/\d+/g) + "", 10) + 2);
                            i18n = i18n.replace(`{$${index + 1}+1}`, parseInt(val.match(/\d+/g) + "", 10) + 1);
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
                i18n = i18n.replace(/\{\s?([\w.]+)\s?\}/g, (match, variable) => {
                    let prop = variable.trim();
                    return values[prop] || prop;
                });
            }
            return i18n === null ? str : i18n;
        };
    }
}
exports.TranslationService = TranslationService;
service_resolver_1.Injector.register("TranslationService", new TranslationService());
//# sourceMappingURL=translationService.js.map