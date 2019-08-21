import mo from './mutation-observer';
import { MockComponent } from '../src/lib/decorators';

export default class TestBed {
  static createComponent(options: {selector:string, target:Function}) {
    let appRoot:any;
    MockComponent({
      selector: options.selector
    })(options.target);
    appRoot = document.createElement(options.selector);
    document.body.appendChild(appRoot);
    mo.ready(options.selector, (ele:any) => {
      appRoot = ele;
    });
    return appRoot;
  }
}