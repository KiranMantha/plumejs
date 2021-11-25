"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestBed = void 0;
const service_resolver_1 = require("../src/lib/service_resolver");
class TestBed {
    static async MockComponent(target) {
        const appRoot = await _waitForComponentToRender(target.prototype.selector);
        return { componentInstance: appRoot.getInstance(), element: appRoot.shadowRoot };
    }
    static MockService(name, target) {
        service_resolver_1.Injector.register(name, target);
        return service_resolver_1.Injector.getService(name);
    }
    static RemoveComponent(fixture) {
        document.body.removeChild(fixture.element.host);
    }
}
exports.TestBed = TestBed;
async function _waitForComponentToRender(tag) {
    const ele = document.createElement(tag);
    document.body.appendChild(ele);
    return new Promise((resolve) => {
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
}
