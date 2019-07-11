"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
const service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js");
const decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
const lighterhtml_plus_1 = require("lighterhtml-plus");
exports.html = lighterhtml_plus_1.html;
const routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
require("./lib/router");
'use strict';
//# sourceMappingURL=plume.js.map