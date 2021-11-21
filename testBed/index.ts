import { Injector } from '../src/lib/service_resolver';

export class TestBed {
  static async MockComponent<T extends { prototype: any }>(target: T) {
    const appRoot = await _waitForComponentToRender(target.prototype.selector);
    return appRoot;
  }

  static MockService(name: string, target: any) {
    Injector.register(name, target);
    return Injector.getService(name);
  }

  static RemoveComponent(node: HTMLElement) {
    document.body.removeChild(node);
  }
}

async function _waitForComponentToRender(tag: string) {
  const ele = document.createElement(tag);
  document.body.appendChild(ele);
  return new Promise((resolve) => {
    function requestComponent() {
      const element = document.querySelector(tag);
      if (element) {
        resolve(element);
      } else {
        window.requestAnimationFrame(requestComponent);
      }
    }
    requestComponent();
  });
}
