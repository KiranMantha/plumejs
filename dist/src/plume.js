"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.wrapIntoObservable = exports.useFormFields = exports.useContext = exports.useState = exports.useRef = exports.DomTransition = exports.TranslationService = exports.Input = exports.Injector = exports.html = exports.Injectable = exports.Component = void 0;
const internalTranslationService_1 = require("./lib/internalTranslationService");
internalTranslationService_1.registerInternaltranslationService();
const service_resolver_1 = require("./lib/service_resolver");
Object.defineProperty(exports, "Injector", { enumerable: true, get: function () { return service_resolver_1.Injector; } });
const decorators_1 = require("./lib/decorators");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return decorators_1.Component; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return decorators_1.Injectable; } });
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return decorators_1.Input; } });
const lighterhtml_1 = require("lighterhtml");
Object.defineProperty(exports, "html", { enumerable: true, get: function () { return lighterhtml_1.html; } });
const augmentor_1 = require("augmentor");
Object.defineProperty(exports, "useRef", { enumerable: true, get: function () { return augmentor_1.useRef; } });
Object.defineProperty(exports, "useState", { enumerable: true, get: function () { return augmentor_1.useState; } });
Object.defineProperty(exports, "useContext", { enumerable: true, get: function () { return augmentor_1.useContext; } });
const domTransition_service_1 = require("./lib/domTransition.service");
Object.defineProperty(exports, "DomTransition", { enumerable: true, get: function () { return domTransition_service_1.DomTransition; } });
const translationService_1 = require("./lib/translationService");
Object.defineProperty(exports, "TranslationService", { enumerable: true, get: function () { return translationService_1.TranslationService; } });
const hooks_1 = require("./lib/hooks");
Object.defineProperty(exports, "useFormFields", { enumerable: true, get: function () { return hooks_1.useFormFields; } });
const utils_1 = require("./lib/utils");
Object.defineProperty(exports, "wrapIntoObservable", { enumerable: true, get: function () { return utils_1.wrapIntoObservable; } });
Object.defineProperty(exports, "isArray", { enumerable: true, get: function () { return utils_1.isArray; } });
