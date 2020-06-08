"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const service_resolver_1 = require("../src/lib/router/service_resolver");
class TestBed {
    static MockComponent(target) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let appRoot = yield _waitForComponentToRender(target.prototype.selector);
            return appRoot;
        });
    }
    static MockService(name, target) {
        service_resolver_1.Injector.register(name, target);
        return service_resolver_1.Injector.get(name);
    }
    static RemoveComponent(node) {
        document.removeChild(node);
    }
}
exports.TestBed = TestBed;
function _waitForComponentToRender(tag) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let ele = document.createElement(tag);
        document.body.appendChild(ele);
        return new Promise(resolve => {
            function requestComponent() {
                const element = document.querySelector(tag);
                if (element) {
                    resolve(element);
                }
                else {
                    window.requestAnimationFrame(requestComponent);
                }
            }
            requestComponent();
        });
    });
}
