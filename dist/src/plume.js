//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
var decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
var lighterhtml_1 = require("lighterhtml");
exports.html = lighterhtml_1.html;
var augmentor_1 = require("augmentor");
exports.useRef = augmentor_1.useRef;
var routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
var domTransition_service_1 = require("./lib/domTransition.service");
exports.DomTransition = domTransition_service_1.DomTransition;
var translationService_1 = require("./lib/translationService");
exports.TranslationService = translationService_1.TranslationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1bWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGx1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaUZBQWlGO0FBQ2pGLCtGQUErRjtBQUMvRixZQUFZLENBQUM7O0FBQ2IsMkRBQWtEO0FBWWhELG1CQVpPLDJCQUFRLENBWVA7QUFYViwrQ0FBZ0U7QUFROUQsb0JBUk8sc0JBQVMsQ0FRUDtBQUNULHFCQVRrQix1QkFBVSxDQVNsQjtBQUdWLGdCQVo4QixrQkFBSyxDQVk5QjtBQVZQLDJDQUFtQztBQVFqQyxlQVJPLGtCQUFJLENBUVA7QUFQTix1Q0FBbUM7QUFlakMsaUJBZk8sa0JBQU0sQ0FlUDtBQWRSLHFEQUE2QztBQVMzQyxpQkFUTyxzQkFBTSxDQVNQO0FBUlIscUVBQTREO0FBVTFELHdCQVZPLHFDQUFhLENBVVA7QUFUZiwrREFBOEQ7QUFRNUQsNkJBUk8sdUNBQWtCLENBUVAifQ==