const { JSDOM } = require('jsdom-wc');

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }

// Object.assign(global, {
//   document: window.document,
//   HTMLElement: window.HTMLElement,
//   customElements: window.customElements,
//   window: window
// });

global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;
global.window = window;

//copyProps(window, global);
