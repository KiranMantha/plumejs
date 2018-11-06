import { plumeTestBed } from '../index';
import plumejs from '../plume';

describe("Plumejs Service", () => {
  var service1,service2;
  beforeEach(()=>{
    plumejs.factory('testservice', function() {
      return {
        greet: function(){
          return 'hello';
        }
      }
    });
    service1 = plumeTestBed.get('testservice');
  });
  it('sample factory test', () => {
    expect(service1.greet()).toBe('hello');
  });
  describe('testing service dependency', () => {
    beforeAll(()=>{
      plumejs.factory('testservice1', ['testservice',function(ts) {
        return {
          greet: function(){
            return ts.greet();
          }
        }
      }]);
      service2 = plumeTestBed.get('testservice1');
    });
    it('should return hello from testservice', () => {
      expect(service2.greet()).toBe('hello');
    });
  })
});