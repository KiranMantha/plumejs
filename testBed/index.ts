import { Injector } from '../src/lib/service_resolver';

export class TestBed {
  static async MockComponent(target:Function) {
    let appRoot = await _waitForComponentToRender(target.prototype.selector);
    return appRoot;
  }

  static MockService(name:string, target:any) {
    Injector.register(name, target);
    return Injector.get(name);
  }

  static RemoveComponent(node: HTMLElement) {
    document.removeChild(node);
  }
}

async function _waitForComponentToRender(tag:string) {
  let ele = document.createElement(tag);
  document.body.appendChild(ele);
  return new Promise(resolve => {
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