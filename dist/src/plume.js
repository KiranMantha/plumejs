//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./lib/service_resolver");
exports.Injector = service_resolver_1.Injector;
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js");
const decorators_1 = require("./lib/decorators");
exports.Component = decorators_1.Component;
exports.Injectable = decorators_1.Injectable;
exports.Input = decorators_1.Input;
const lighterhtml_plus_1 = require("lighterhtml-plus");
exports.hook = lighterhtml_plus_1.hook;
exports.html = lighterhtml_plus_1.html;
const routerService_1 = require("./lib/routerService");
exports.Router = routerService_1.Router;
require("./lib/router");
const augmentor = __importStar(require("augmentor"));
const { useRef } = augmentor;
exports.useRef = useRef;
//# sourceMappingURL=plume.js.map