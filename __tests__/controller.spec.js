import {
  plumejs
} from '../index';

describe("Plumejs Controller", () => {
  var ctrl1, ctrl2, ctrl3, span1, span2, span3;

  beforeAll(() => {
    document.body.innerHTML =
      '<div id="parent">' +
      '  <span id="testctrl1"></span>' +
      '  <span id="testctrl2"></span>' +
      '  <span id="testctrl3"></span>' +
      '  <span id="testctrl4"></span>' +
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
      plumejs.factory('testService', function () {
        return {
          greet: function () {
            return 'Hello';
          }
        }
      })
      plumejs.render('#testctrl2', {
        template: `
        <div>
          <label>{{ greet }}</label>
          <div id='personsCount' if-value='hasPersons'>
            <span>persons count is: {{persons.length}}</span>
          </div>
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
          this.hasPersons = false;
          this.option = '';
          this.init = function () {
            var _greet = ts.greet();
            this.updateCtx({
              greet: _greet
            });
          }

          this.handleChange = function (e) {
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
          persons: ['person1', 'person2'],
          hasPersons: true
        });
        li = span2.querySelectorAll('li');
        expect(li.length).toBe(2);
        var spnPersons = span2.querySelector('#personsCount');
        expect(spnPersons.textContent.replace(/[\r\n]/g, "").trim()).toBe('persons count is: 2');
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

  describe('with templateUrl', () => {
    beforeAll(() => {
      var mockTemplate = '<label>{{greet}}</label>';
      window.returnMockHttpResponse({
        responseText: mockTemplate
      });      
    });    
    it('should set controller value in dom', () => {
      plumejs.render('#testctrl3', {
        templateUrl: './test.tmpl.html',
        controller: function () {
          this.greet = 'Hello';
        }
      });
      ctrl3 = plumejs.get('#testctrl3');
      span3 = document.getElementById('testctrl3');

      var lbl = span3.querySelector('label');
      expect(lbl.textContent).toBe('Hello');
    });    
  });

  describe('error cases', () => {
    beforeEach(()=>{
      plumejs.destroy('#testctrl4');
      document.getElementById('testctrl4').innerHTML = '';
    });
    
    it('should throw error if template or templateUrl is not supplied', () => {
      expect(() => {
        plumejs.render('#testctrl4', {controller: function() {}})
      }).toThrow('Required either template or templateUrl');
    });

    it('should throw error if rendering object is not supplied', () => {
      expect(()=>{
        plumejs.render('#testctrl4')
      }).toThrow('rendering object should not be empty')
    });

    it('should throw error if controller is not supplied', () => {
      expect(() => {
        plumejs.render('#testctrl4', {template: '<div>node1</div><div>node1</div>'})
      }).toThrow('controller is required and should be a function or an array');
    });

    it('should throw error if root node is not supplied', () => {
      expect(() => {
        plumejs.render('#testctrl4', { template: `        
          <div>node1</div>
          <div>node2</div>
        `, controller: function(){}})
      }).toThrow('Template should contain one root element');
    });
  });
});