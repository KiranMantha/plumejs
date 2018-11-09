[![Build Status](https://travis-ci.org/KiranMantha/plumejs.svg?branch=master)](https://travis-ci.org/KiranMantha/plumejs) [![Coverage Status](https://coveralls.io/repos/github/KiranMantha/plumejs/badge.svg?branch=master)](https://coveralls.io/github/KiranMantha/plumejs?branch=master)


Plumejs is a very light weight vanilla js framework to build spa's. it comes with features like router, change detection during async operations, data-sharing via factories, dependency injection, built-in pub-sub etc.

Plumejs is a conceptual combination of angularjs and react. just like angular one can register factories, routing, inline templates/templateURls and like react it has `updateCtx` function to update the view after modal updations and a render function to render the component.

Plumejs is built as UMD module. Hence it can be load via script tag in html or as es6 module in nodejs. Plumejs has very few syntaxes enabling faster learning curve.

To start with Plumejs

# Creating Components

Creating component is a non-hectic task.

1. create a placeholder in html as `<div id='app'></div>`
2. import `render` function and create component as follows

```
  import { render } from 'plumejs';

  render('#app', {
    template: '<div>{{ greet }}</div>',
    controller: function() {
      this.greet = 'hi';
    }
  });

```

Component provide `init` hook to perform model data initialization as follows:

```
render('#app', {
  template: `
    <div>
      <div if-value='data.length > 0'>
        <ul>
            <li item='person' loop='data' click="alert(person)">{{ person.name }}</li>
          </ul>
      </div>
    </div>
  `
  controller: function() {
    this.data = [];

    this.alert = function(p) {
      alert(p);
    }

    this.init = function() {
      fetch('persons-api').then(function(res){
        return res.json();
      }).then(function(data){
        this.updateCtx({ data: data }); // triggers change detection and update view
      });
    }
  }
});

```

# Creating Factories

Creating factory is as simple as creating a component

```
  import factory from './plumejs';

  factory('personService', function () {
    return {
      getPersons: function () {
        return fetch('persons-api').then(function(res){
          return res.json();
        });
      }
    }
  });

  // in controller

  ---
    controller: ['personService', function(ps) {
      this.data = [];

      this.init = function() {
        ps.getPersons().then(function(data){
          this.data = data;
          this.updateCtx();
        });
      }
    }]
  ---
```

factories in plumejs are singleton

# Implementing Routing

Plumejs provides simple api to incorporate routing in the application. Inorder for router to work, we need to provide a router outlet and routes.

Adding routes is as follows: 

1. Add router outlet in html as `<div id='content'></div>`
2. register the router outlet in plume router

```
import { router } from './plume.js'

plume.router.setRouterOutlet(document.getElementById('content'));

```

3. now add routes to plume router

```
  plume.router.addRoutes([
    {
      path: '',
      redirectTo: '/component1'
    },
    {
      path: '/component1',
      template: `<div id='component1'></div>`
    },
    {
      path: '/component2',
      template: `<div id='component2'></div>`
    },
    {
      path: '/component3/:id',
      template: `<div id='component3'></div>`
    }
  ]);

```

where `component1, component2, component3` are registered using `render` function as:
`render('#component1', ...) render('#component2', ...) render('#component3', ...)`

Accessing route params for current route is as follows:

```
// In component file

import {render, router} from './plume.js'

render('#component1', {
  template: '',
  controller: function() {
    this.init = function() {
      console.log(router.currentRoute().params);
    }
  }
});

```

Plume router module also supports navigation from component to other as follows:

```
// inside component controller
router.navigateTo('/component2');

```
