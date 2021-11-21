import { Injector } from '../src/lib/service_resolver';

export interface Fixture<T> {
  componentInstance: T;
  element: ShadowRoot;
}

export class TestBed {
  static async MockComponent<T>(target: ThisType<T>): Promise<Fixture<T>> {
    const appRoot: any = await _waitForComponentToRender((target as any).prototype.selector);
    return { componentInstance: appRoot.getInstance(), element: appRoot.shadowRoot };
  }

  static MockService(name: string, target: any) {
    Injector.register(name, target);
    return Injector.getService(name);
  }

  static RemoveComponent<T>(fixture: Fixture<T>) {
    document.body.removeChild(fixture.element.host);
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
