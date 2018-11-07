import { plumejs } from '../index';
import MutationObserver from './mocks/mo.mock';

//Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });

describe("Plumejs Controller", () => {
  var ctrl1,ctrl2;

  global.MutationObserver = window.MutationObserver = MutationObserver;
  
  beforeAll(()=> {
    document.body.innerHTML =
    '<div>' +
    '  <span id="testctrl1"></span>' +
    '  <span id="testctrl2"></span>' +
    '</div>';
    plumejs.render('#testctrl1', {
      template: `<label>{{ greet }}</label>`,
      controller: function(){
        this.greet = 'Hello';
      }
    });
    ctrl1 = plumejs.get('#test');
    console.log(ctrl1);
  });
  it('sample controller test', () => {
    expect(ctrl1.greet).toBe('hello');
  });
  describe.skip('testing controller with dependency', () => {
    beforeAll(()=>{
      plumejs.factory('testctrl1', ['testctrl',function(ts) {
        return {
          greet: function(){
            return ts.greet();
          }
        }
      }]);
      ctrl2 = plumejs.get('testctrl1');
    });
    it('should return hello from testctrl', () => {
      expect(ctrl2.greet()).toBe('hello');
    });
  })
});