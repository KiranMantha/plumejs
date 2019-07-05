[![Build Status](https://travis-ci.org/KiranMantha/plumejs.svg?branch=master)](https://travis-ci.org/KiranMantha/plumejs) [![Coverage Status](https://coveralls.io/repos/github/KiranMantha/plumejs/badge.svg?branch=master)](https://coveralls.io/github/KiranMantha/plumejs?branch=master)

Demo [here](https://kiranmantha.github.io/plumejs/)

Plumejs is a very light weight typescript framework to build spa's.It is build on more accessable web components, typescript and lighterhtml. It comes with features like change detection during async operations, data-sharing via factories and props, dependency injection.

Plumejs is a conceptual combination of angularjs and react. just like angular one can register factories, components, life-cycle hooks and like react it have `props` to pass data from one component to other, `update` function to update the view after modal updations and a render function to render the component.

Plumejs is built as UMD module. Hence it can be load via script tag in html or as es6 module in nodejs. Plumejs has very few syntaxes enabling faster learning curve.

To start with Plumejs

# Creating Components

Creating component is a non-hectic task.

1. import `Component, html` functions and create component as follows

```
  import { Component, html } from 'plumejs';

  @Component({
    selector: 'test-ele'
  })
  class TestEle {
    test:string;
    constructor(){
      this.text = 'hello world!'
    }
    render(){
      return html(`<div>${this.text}</div>`)
    }
  }

```

Component provide `mount` hook to perform model data initialization as follows:

```
@Component({
  selector: 'person-list'
})
class PersonsList {
  data:Array<string> = [];
  constructor(){}
  mount(){
    fetch('persons-api').then(res => res.json()).then(data => {
      this.data = data;
      this.update(); // triggers change detection and update view
    })
  }

  alertName(name:string){
    alert(name);
  }

  render(){
    return html(`<div>
      <ul>${
        this.data.map((item:string) => html`<li onclick=${()=>{ this.alertname(item); }}>${item}</li>`)
      }</ul>
    </div>`)
  }
}

```

We can even share data between two components as below:

```
  import { Component, html, Input } from 'plumejs';

  @Component({
    selector: 'person-list'
  })
  class PersonsList {
    data:Array<string> = [];
    persondetails:any = {};
    constructor(){}
    mount(){
      fetch('persons-api').then(res => res.json()).then(data => {
        this.data = data;
        this.update(); // triggers change detection and update view
      })
    }

    alertName(name:string){
      this.persondetails.name = name;
      this.update();
    }

    render(){
      return html`<div>
        <ul>${
          this.data.map((item:string) => html`<li onclick=${()=>{ this.alertname(item); }}>${item}</li>`)
        }</ul>
        <person-details userdetails=${this.persondetails}></person-details>
      </div>`
    }
  }

  @Component({
    selector: 'person-details'
  })
  export class PersonDetails {

    @Input()
    userdetails:any = {};

    render(){
      return html`${
        <div>${this.props.name}</div>
      }`
    }
  }

```

# Creating Services

Creating service is as simple as creating a component

```
  import { Injectable } from './plumejs';

  @Injectable()
  export class PersonService {
    getPersons() {
      return fetch('persons-api').then(res => res.json());
    }
  }

  // in component

  @Component({
    selector: 'test-ele'
  })
  class TestEle {
    test:string;
    data:Array<string> = [];
    constructor(private personSrvc:PersonService){
      this.text = 'hello world!'
    }

    mount(){
      this.personSrvc.getPersons().then(data => {
        this.data = data;
        this.update(); // triggers change detection and update view
      })
    }

    ...
  }
```

Services in plumejs are singleton

Note: The constructor arguments are strictly typed and should not be native types or 'any'. Else they will return undefined.
