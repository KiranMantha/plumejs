import { MockComponent } from '../src/lib/decorators';
import { Injector } from '../src/lib/service_resolver';

export class TestBed {
  static async MockComponent(options: {selector:string, target:Function}) {
    let appRoot:any;
    MockComponent({
      selector: options.selector
    }, options.target);
    appRoot = await _waitForComponentToRender(options.selector);
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