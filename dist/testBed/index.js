"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mutation_observer_1 = tslib_1.__importDefault(require("./mutation-observer"));
const decorators_1 = require("../src/lib/decorators");
class TestBed {
    static createComponent(options) {
        let appRoot;
        decorators_1.MockComponent({
            selector: options.selector
        }, options.target);
        appRoot = document.createElement(options.selector);
        document.body.appendChild(appRoot);
        mutation_observer_1.default.ready(options.selector, (ele) => {
            appRoot = ele;
        });
        return appRoot;
    }
}
exports.default = TestBed;
//# sourceMappingURL=index.js.map