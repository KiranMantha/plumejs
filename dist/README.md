[![Build Status](https://travis-ci.org/KiranMantha/plumejs.svg?branch=master)](https://travis-ci.org/KiranMantha/plumejs) [![Coverage Status](https://coveralls.io/repos/github/KiranMantha/plumejs/badge.svg?branch=master)](https://coveralls.io/github/KiranMantha/plumejs?branch=master)

Demo [here](https://kiranmantha.github.io/plumejs/)

PlumeJs is a very light weight typescript framework to build spa's. It is build on more accessable web components, typescript and lighterhtml. It comes with features like change detection during async operations, data-sharing via factories and props, dependency injection.

PlumeJs is a conceptual combination of angularjs and react. just like angular one can register services, components, life-cycle hooks, `Input` for passing data from one component to another and like react `update` function to update the view after modal updations and a render function to render the component.

PlumeJs has very few syntaxes enabling faster learning curve.

For most asked questions, please check [QA.md](https://github.com/KiranMantha/plumejs/blob/dev-branch/QA.md)

To start with PlumeJs

# Yo Plumejs

Plumejs has yeoman generator which provides the entire scaffolding for your project. To start with:

1. Require Nodejs version 11.0.0 or above
2. Run `npm install -g yeoman generator-plumejs`
3. After completing installation run `yo plumejs` in your destination folder. This will ask you about your project name and description and will install all your required dependencies.
4. After all the dependencies were installed, you can run application using command `npm start`.


Here is a sneak peak into bultins:

# Creating Components

Creating component is a non-hectic task.

1. import `Component, html` functions and create component as follows

```
  import { Component, html } from 'plumejs';

  @Component({
    selector: 'test-ele',
    styleUrl: 'test-ele.scss', => no need to add './' as prefix.
    root: true
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

Note: through out the entire application there will be only one root component. adding more root components will not render the page and throw duplicate root component error.

For styling one can use css or scss formats.

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

Just like react, PlumeJs provides `useRef` as references. example:

```
import {Component, Ref, useRef}
@Component({
  selector: 'sample-comp'
})
class SampleComp {
	inputField:Ref<HTMLElement> = useRef(null);
	
	getRef(){
		console.log(this.inputField);
	}

  render() {
    return html`
     <div>
			<input type='text' ref=${this.inputField} />
      <button onclick=${()=>{ this.getRef() }}>click</button>
    </div>
    `
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

Services in PlumeJs are singleton

Note: The constructor arguments are strictly typed and should not be native types or 'any'. Else they will return undefined.

# Routing

By default Plumejs Routing uses dynamic imports to chunk out route specific logic which reduces main bundle size significantly. Routing can be implemented in 2 simple steps:

1. Declare routes array as below

```
  import { Router, Route } from 'plumejs';

  @Component({
    selector: 'app-comp',
    root: true
  })
  class AppComponent {
    constructor() {
      Router.registerRoutes(this.routes);
    }

    routes: Array<Route> = [{
      path: '',
      redirectto: '/home',
    },{
      path: '/home',
      template: '<app-home></app-home>',
      templatePath: () => import('<path-to-ts-file-of-home-component>')
    },{
      path: '/contactus',
      template: '<app-contactus></app-contactus>',
      templatePath: () => import('<path-to-ts-file-of-contactus-component>')
    },{
      path: '/details/:id',
      template: '<app-details></app-details>',
      templatePath: () => import('<path-to-ts-file-of-details-component>'),
      // canActivate route gaurd helps to check wheter the route is accesseble or not.
      // canActivate function should return Promise<boolean> or Observable<boolean> or boolean.
      canActivate: () => {
        let key = localStorage.getItem('key');
        if(!key) {
          this.router.navigateTo('/home');
          return false;
        }
        return true;
      }
    }]
  }

  Router.registerRoutes(routes); => Routes must be registered with Router service. In previous version(< 2.0.8), routes are passed as input to router-outlet.

  ...
```

2. add `<router-outlet></router-outlet>` in your component

That's it. Now we have the routing in our application.

To navigate from one route to other from a component:

```
  import {Router} from './plumejs'
  @Component({
    selector: '<your-selector></your-selector>'
  })
  class YourClass {
    constructor(private router: Router){}

    onclick() {
      this.router.navigateTo('/your-route');
    }
  }
```

To Access current route parameters

```
  route = [{
    path: '/details/:id'
    ....
  }]
  ...

  if window.url is /details/123
  const currentRoute = this.router.getCurrentRoute();
  const id = currentRoute.params.id; /// returns 123
```

# Setting up Internationalization

Adding translations in PLumeJS is a breeze. Checkout below for implementation:

1. add `i18n` folder to your src folder (you can name it as per your standards)

```
src
 |- i18n
 
```

2. add translation files to i18n folder
```
in i18n/en.ts

const locale_en = {
  'user': {
    'name': 'My name is {name}'
  }
}
export default locale_en;

in i18n/fr.ts

const locale_fr = {
  'user': {
    'name': 'je m`appelle {name}'
  }
}
export default locale_fr;
```

3. import translation files in root component and pass them to translation service
```
import {..., TranslationService} from 'plumejs';
import locale_en from '<folder-i18n>/en';
import locale_fr from '<folder-i18n>/fr';

@Component({
  selector: 'app-root'
})
class AppComponent {
  constructor(translations: TranslationService) {
    translations.setTranslate(locale_en, 'en');
    translations.setTranslate(locale_fr, 'fr');
    translations.setDefaultLanguage('en');
  }
}
```
4. now translations are setup for english and french languages. 

5. To pass html from translations:

```
<div>${{html: 'html-translation'.translate() }}</div>
```

The above object inside template literal contains 'html' key which properly allow lighterhtml to render html properly. This is to address a defect where `<div innerHTML=${ 'html-translation'.translate() }></div>` won't work properly.

For normal text translations:

```
<div>${ 'text-translation'.translate() }</div>
```

# Unit Tests
1. sample component unit test:
```
import { TestBed } from '../testBed';
import { AppComponent } from 'src';

describe("Plumejs Component", () => {

  let appRoot:any;

	beforeAll(async () => {
    appRoot = await TestBed.MockComponent(AppComponent);
  });
  
  it('should render h1 element', () => {
    const h1:any = appRoot.querySelector('h1');
    expect(h1.innerHTML).toBe("Hello World");
  });

  it('should return "hello" on button click', () => { 
    let span = appRoot.querySelector('span');
    const model:AppComponent = appRoot.getModel();
    expect(span.innerHTML).not.toContain('hello');
    model.greet();
    expect(span.innerHTML).toContain('hello');
  });

  afterAll(()=>{
    TestBed.RemoveComponent(appRoot);
  });
});

```
2. sample service unit test:
```
class SampleService {

	data: any = {};

	callApi() {
		return fetch("https://jsonplaceholder.typicode.com/users").then((res:any) => res.json()).then((res: any) => {
			this.data = res;
		});
	}
}

describe("Plumejs Service", () => {

	let servc: SampleService;
	let _fetch: any = fetch;

	beforeAll(() => {
		servc = new SampleService();
	});

	beforeEach(() => {
		_fetch.resetMocks();
	});

	it("should work",async () => {
    _fetch.mockResponseOnce(JSON.stringify({
      animals: ["cow", "goat", "lion"]
    }));
		await servc.callApi();
		expect(servc.data.animals.length).toBe(3);
	});
});

```

In the memory of my beloved cousin :heartbeat: :heartbeat: :heartbeat: [Pushpak Ganti](https://www.linkedin.com/in/pushpak-ganti-3919aa10/)