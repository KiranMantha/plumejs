import { Component } from '../index';
import mo from './mutation-observer';

export default class TestBed {
  static createComponent(options: {selector:string, target:Function}) {
    let appRoot:any;
    Component({
      selector: options.selector
    })(options.target);
    appRoot = document.createElement(options.selector);
    document.body.appendChild(appRoot);
    mo.ready(options.selector, (ele:any) => {
      appRoot = ele;
      console.log('callback innerhtml', appRoot.innerHTML);
    });
    return appRoot;
  }
}