"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerInternaltranslationService = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const decorators_1 = require("./decorators");
const registerInternaltranslationService = () => {
    let InternalTranslationService = class InternalTranslationService {
        constructor() {
            this.updateTranslations = new rxjs_1.Subject();
        }
    };
    InternalTranslationService = tslib_1.__decorate([
        decorators_1.Injectable()
    ], InternalTranslationService);
};
exports.registerInternaltranslationService = registerInternaltranslationService;
