import {
  plumejs
} from '../index';

describe("Plumejs Controller", () => {
  var ctrl1, ctrl2, span1, span2;

  beforeAll(()=>{
    document.body.innerHTML =
        '<div>' +
        '  <span id="testctrl1"></span>' +
        '  <span id="testctrl2"></span>' +
        '</div>';
  });

  describe('without dependencies', () => {
    beforeAll(() => {
      plumejs.render('#testctrl1', {
        template: `
        <div>
          <label>{{ greet }}</label>
          <select item='opt' loop='options' bind='option' change="test()">
            <option value='{{opt}}'>{{ opt }}</option>
          </select>
        </div>
      `,
        controller: function () {
          this.greet = 'Hello';
          this.options = [1, 2];
          this.option = 2;
        }
      });
      ctrl1 = plumejs.get('#testctrl1');
      span1 = document.getElementById('testctrl1');
    });
    it('should return "Hello"', () => {
      expect(ctrl1.greet).toBe('Hello');
    });
    it('should set controller value in dom', () => {
      var lbl = span1.querySelector('label');
      expect(lbl.textContent).toBe('Hello');
    });
    it('should set controller value in dom after updation', () => {
      var lbl = span1.querySelector('label');
      ctrl1.updateCtx({
        greet: 'Hello World'
      });
      expect(lbl.textContent).toBe('Hello World');
    });
    it('should update the dropdown children when controller data changed', () => {
      var select = span1.querySelector('select');
      expect(select.children.length).toBe(2);
      ctrl1.updateCtx({
        options: [1, 2, 3]
      });
      select = span1.querySelector('select');
      expect(select.children.length).toBe(3);
    });
  });

  describe('with dependencies', () => {
    beforeAll(() => {
      plumejs.factory('testService', function(){
        return {
          greet: function(){
            return 'Hello';
          }
        }
      })      
      plumejs.render('#testctrl2', {
        template: `
        <div>
          <label>{{ greet }}</label>
          <div if-value='persons.length > 0'>
            <ul>
              <li item='person' loop='persons'>{{person}}</li>
            </ul>
          </div>
          <label id='lbloption'>{{ option }}</label>
          <input type='text' input='handleChange($event)'/>
        </div>
      `,
        controller: ['testService', function (ts) {
          this.greet = '';
          this.persons = [];
          this.option='';
          this.init = function(){
            var _greet = ts.greet();
            this.updateCtx({
              greet: _greet
            });
          }

          this.handleChange = function(e) {
            this.updateCtx({
              option: e.currentTarget.value
            });
          }
        }]
      });
      ctrl2 = plumejs.get('#testctrl2');
      span2 = document.getElementById('testctrl2');
    });
    it('should return "Hello"', () => {
      expect(ctrl2.greet).toBe('Hello');
    });
    it('should set controller value in dom', () => {
      var lbl = span2.querySelector('label');
      expect(lbl.textContent).toBe('Hello');
    });
    it('should display all persons in async operation', (done) => {
      var li = span2.querySelectorAll('li');
      setTimeout(() => {
        ctrl2.updateCtx({
          persons: ['person1', 'person2']
        });
        li = span2.querySelectorAll('li');
        expect(li.length).toBe(2);
        done();
      }, 1000);
      expect(li.length).toBe(0);
    });
    it('should update label text on input change', () => {
      var input = span2.querySelector('input');
      input.value = '123';
      input.trigger('input');
      var label = span2.querySelector('#lbloption');
      expect(label.textContent).toBe('123');
    });
  });
});