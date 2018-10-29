import plume from '../plume.js';

plume.router.setRouterOutlet(document.getElementById('content'));

plume.router.addRoutes([
  {
    path: '',
    redirectTo: '/home'
  },
  {
    path: '/home',
    template: `<div>I'm on home route</div>`
  },
  {
    path: '/contactus',
    template: `<div>I'm on contactus route</div>`
  },
  {
    path: '/about/:id',
    template: `<div>I'm on about route</div>`
  }
]);

plume.registerFactory('testService', function () {
  return {
    getUsers: function (i) {
      return fetch('https://api.github.com/users?since=135');
    }
  }
});

plume.render('#test', {
  template: `
      <div>
      <p>{{ name }} <span> testing node</span></p>
      <p><span>{{ age }}</span> <span>{{ option }}</span></p>
      <div if-value='skills.length > 0'>
        <ul>
          <li item='skill' loop='skills' click="alert(skill)">{{ skill.login }}</li>
        </ul>
      </div>
      <p>{{dateVal}}</p>
      <input type='text' bind='name'/>
      <input type='date' bind='dateVal'/>
      <select item='opt' loop='options' bind='option' change="test()">
        <option value='{{opt}}'>{{ opt }}</option>
      </select>
      <button click='testfunc("func")'>test</button>
    </div>
    `,
  controller: ['testService', function (testService) {
    var k = 'test';
    this.name = 'kiran';
    this.con = true;
    this.age = 29;
    this.option = 2;
    this.skills = [];
    this.options = [1, 2];
    this.dateVal = '2018-09-05';
    this.alert = function (val) {
      alert(val);
      this.name = val.login;
    }
    this.test = function () {
      console.log('change via select');
    }

    this.testfunc = function (a) {
      console.log(a);
    }

    this.init = function () {
      var _this = this;
      setTimeout(function () {
        testService.getUsers().then(function (response) {
          return response.json();
        })
          .then(function (data) {
            _this.skills = data;
            _this.options = [1, 2, 3];
            _this.updateCtx();
          });
      }, 2000);
    }
  }]
});

plume.render('#register', {
  template: `<div class='card'>
    <header class='card-header'>
      <p class='card-header-title'>
        Register User
      </p>
    </header>
    <div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" bind='un' type="text"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" bind='pwd'/>
        </div>
      </div>
      <div class="control">
        <button class="button" click='register()'>Submit</button>
      </div>
    </div>
  </div>`,
  controller: function () {
    this.un = '';
    this.pwd = '';

    this.register = function () {
      console.log(this.un, this.pwd);
    }
  }
});