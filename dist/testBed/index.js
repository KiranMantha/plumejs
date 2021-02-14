import { Injector } from '../src/lib/service_resolver';
export class TestBed {
    static async MockComponent(target) {
        let appRoot = await _waitForComponentToRender(target.prototype.selector);
        return appRoot;
    }
    static MockService(name, target) {
        Injector.register(name, target);
        return Injector.get(name);
    }
    static RemoveComponent(node) {
        document.removeChild(node);
    }
}
async function _waitForComponentToRender(tag) {
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
}
