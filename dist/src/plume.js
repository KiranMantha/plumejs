"use strict";
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
const domTransition_service_1 = require("./lib/domTransition.service");
exports.DomTransition = domTransition_service_1.DomTransition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1bWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGx1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsWUFBWSxDQUFDOztBQUNiLDZEQUFrRDtBQVloRCxtQkFaTywyQkFBUSxDQVlQO0FBWFYsaURBQWdFO0FBUTlELG9CQVJPLHNCQUFTLENBUVA7QUFDVCxxQkFUa0IsdUJBQVUsQ0FTbEI7QUFHVixnQkFaOEIsa0JBQUssQ0FZOUI7QUFYUCx1REFBNkM7QUFZM0MsaUJBWk8sc0JBQU0sQ0FZUDtBQVhSLGlFQUE4RDtBQVk1RCw2QkFaTyx1Q0FBa0IsQ0FZUDtBQVZwQix1REFBd0M7QUFNdEMsZUFOTyx1QkFBSSxDQU1QO0FBTE4seUNBQW1DO0FBYWpDLGlCQWJPLGtCQUFNLENBYVA7QUFaUix1RUFBNEQ7QUFTMUQsd0JBVE8scUNBQWEsQ0FTUCJ9