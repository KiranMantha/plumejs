//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
const decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
const lighterhtml_1 = require("lighterhtml");
exports.html = lighterhtml_1.html;
const augmentor_1 = require("augmentor");
exports.useRef = augmentor_1.useRef;
const routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
const domTransition_service_1 = require("./lib/domTransition.service");
exports.DomTransition = domTransition_service_1.DomTransition;
const translationService_1 = require("./lib/translationService");
exports.TranslationService = translationService_1.TranslationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1bWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGx1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUZBQWlGO0FBQ2pGLCtGQUErRjtBQUMvRixZQUFZLENBQUM7O0FBQ2IsNkRBQWtEO0FBWWhELG1CQVpPLDJCQUFRLENBWVA7QUFYVixpREFBZ0U7QUFROUQsb0JBUk8sc0JBQVMsQ0FRUDtBQUNULHFCQVRrQix1QkFBVSxDQVNsQjtBQUdWLGdCQVo4QixrQkFBSyxDQVk5QjtBQVZQLDZDQUFtQztBQVFqQyxlQVJPLGtCQUFJLENBUVA7QUFQTix5Q0FBbUM7QUFlakMsaUJBZk8sa0JBQU0sQ0FlUDtBQWRSLHVEQUE2QztBQVMzQyxpQkFUTyxzQkFBTSxDQVNQO0FBUlIsdUVBQTREO0FBVTFELHdCQVZPLHFDQUFhLENBVVA7QUFUZixpRUFBOEQ7QUFRNUQsNkJBUk8sdUNBQWtCLENBUVAifQ==