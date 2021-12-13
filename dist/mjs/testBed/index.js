import { Injector } from '../src/lib/service_resolver';
export class TestBed {
    static async MockComponent(target) {
        const appRoot = await _waitForComponentToRender(target.prototype.selector);
        return { componentInstance: appRoot.getInstance(), element: appRoot.shadowRoot };
    }
    static MockService(name, target) {
        Injector.register(name, target);
        return Injector.getService(name);
    }
    static RemoveComponent(fixture) {
        document.body.removeChild(fixture.element.host);
    }
}
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
