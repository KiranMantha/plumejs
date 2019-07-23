'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
var decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
var routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
require("./lib/router");
var lighterhtml_plus_1 = require("lighterhtml-plus");
exports.html = lighterhtml_plus_1.html;
var augmentor_1 = require("augmentor");
exports.useRef = augmentor_1.useRef;
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js");
//# sourceMappingURL=plume.js.map