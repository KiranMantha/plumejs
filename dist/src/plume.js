'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
const decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
const routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
const translationService_1 = require("./lib/translationService");
exports.TranslationService = translationService_1.TranslationService;
const lighterhtml_plus_1 = require("lighterhtml-plus");
exports.html = lighterhtml_plus_1.html;
const augmentor_1 = require("augmentor");
exports.useRef = augmentor_1.useRef;
//# sourceMappingURL=plume.js.map