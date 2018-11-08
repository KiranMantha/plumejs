import {plumejs} from '../index';

describe("Plumejs Controller", () => {
  var ctrl1, ctrl2;

  beforeAll(() => {
    document.body.innerHTML =
      '<div>' +
      '  <span id="testctrl1"></span>' +
      '  <span id="testctrl2"></span>' +
      '</div>';
    plumejs.render('#testctrl1', {
      template: `<label>{{ greet }}</label>`,
      controller: function () {
        this.greet = 'Hello';
      }
    });
    ctrl1 = plumejs.get('#testctrl1');
  });
  it('sample controller test', () => {
    expect(ctrl1.greet).toBe('Hello');
  });
  it('should set controller value in dom', () => {
    var span = document.getElementById('testctrl1');
    expect(span.textContent).toBe('Hello');
  });
  it('should set controller value in dom after updation', () => {
    var span = document.getElementById('testctrl1'); 
    ctrl1.greet = 'Hello World';
    ctrl1.updateCtx();
    expect(span.textContent).toBe('Hello World');
  });
});