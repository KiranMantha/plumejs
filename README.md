[![GitHub contributors](https://img.shields.io/github/contributors/kiranmantha/plumejs)](https://GitHub.com/KiranMantha/plumejs/graphs/contributors/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![npm](https://img.shields.io/npm/dw/plumejs)](https://www.npmjs.com/package/plumejs)  [![npm](https://img.shields.io/npm/v/plumejs)](https://www.npmjs.com/package/plumejs)

<p align="center">
  <img alt="PlumeJs logo" src="./logo.jpg">  
</p>

Demo [here](https://kiranmantha.github.io/plumejs-example-repo/). Check console logs for further details.

Example [repo](https://github.com/KiranMantha/plumejs-example-repo/)

PlumeJs is a very light weight typescript framework to build spa's. It is build on more accessable web components, typescript and lighterhtml. It comes with features like change detection during async operations, data-sharing via factories and props, dependency injection.

PlumeJs is a conceptual combination of angularjs and react. just like angular one can register services, components, life-cycle hooks, `Input` for passing data from one component to another and like react `update` function to update the view after modal updations and a render function to render the component.

PlumeJs has very few syntaxes enabling faster learning curve.

For most asked questions, please check [QA.md](https://github.com/KiranMantha/plumejs/blob/dev-branch/QA.md)

To start with PlumeJs

# Yo Plumejs

Plumejs has yeoman generator which provides the entire scaffolding for your project. To start with:

1. Require Nodejs version 11.0.0 or above
2. Run `npm install -g yo generator-plumejs`
3. After completing installation run `yo plumejs` in your destination folder. This will ask you about your project name and description and will install all your required dependencies.
4. After all the dependencies were installed, you can run application using command `npm start`.

# Whats new in 3.0.0 version

Plumejs is now moving to scoped packages, deprecating older versions. In the process it shed 50% in size and dependencies compared to its previous versions. The `core aka @plumejs/core` scope is now only ~50KB and acts more as a library instead of a framework. So the devs can plugin `router aka @plumejs/router` scope for routing, `ui aka @plumejs/ui` scope for built in controls and more to come.

## Breaking change in 3.0.0 version

The usage of `Input` decorator is changed from `@Input() property` to `@Input property`. 

## Breaking change from 2.2.2 version

There is a breaking change in component declaration. Check below:

```
import { Component } from '@plumejs/core';
// import stylesheet in ts file
import componentStyles from './styles.scss';

@Component({
  selector: 'my-comp',
  styles: componentStyles // older styleUrl is renamed to styles
})
...
```
The above change enable watch on stylesheets which is not available in older versions.

Documentation will be updated after testing and after release of new version.

If you want to change scss to css/less, check your typings.d.ts file and update module `*.scss` to `*.css/less`.

The above implementation will break existing unit tests. To fix them, 
1. run `npm i -D jest-transform-stub`
2. add 
```
{
  ...
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
}
```
to your `jest.config.js`

# Documentation
Here is a sneak peak into bultins:

## Creating Components

Creating component is a non-hectic task.

1. import `Component, html` functions and create component as follows

```
  import { Component, html } from '@plumejs/core';
  import testEleStyles from './test-ele.scss';

  @Component({
    selector: 'test-ele',
    styleUrl: testEleStyles,
    root: true
  })
  class TestEle {
    test:string;

    constructor(){
      this.text = 'hello world!'
    }

    render(){
      return html`<div>${this.text}</div>`;
    }
  }

```

Note: Through out the entire application there will be only one root component. Adding more than one root component will not render the page and throw duplicate root component error.

For styling one can use css or scss formats. but scss is the most preferred one. By default all plumejs components are render as block elements. They internally have `:host { display: block; }` property.

## Lifecycle Hooks

`IHooks` interface provides `mount, unmount, inputChanged` lifecycle hooks.

### mount Hook

 It is used to perform model data initialization as follows:

```
import { Component, html, IHooks } from '@plumejs/core';

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
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
    return html`<div>
      <ul>${
        this.data.map((item:string) => html`<li onclick=${()=>{ this.alertname(item); }}>${item}</li>`)
      }</ul>
    </div>`;
  }
}

```

### umount Hook

 It is used to execute any pendending subscriptions as follows:

```
import { Component, html, IHooks } from '@plumejs/core';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
  data:Array<string> = [];
  mySubscription: Observable;

  constructor(){}

  mount(){
    this.mySubscription = from(fetch('persons-api').then(res => res.json()));

    this.mySubscription.subscribe(data => {
      this.data = data;
      this.update(); // triggers change detection and update view
    });
  }

  unmount() {
    this.mySubscription.unsubscribe();
  }

  alertName(name:string){
    alert(name);
  }

  render(){
    return html`<div>
      <ul>
      ${
        this.data.map((item:string) => html`<li onclick=${()=>{ this.alertname(item); }}>${item}</li>`)
      }
      </ul>
    </div>`;
  }
}

```

### inputChanged Hook

It is called when there is any change in `@Input` property

```
import { Component, html, Input, IHooks } from '@plumejs/core';

@Component({
  selector: 'app-root'
})
class App {
  persons: IPersonsData;

  constructor() {
    this.updatePersons = this.updatePersons.bind(this);
  }

  updatePersons() {
    // directly updating persons array will not update UI. so creating new array.
    this.persons = [...this.persons, new person record]; 
    this.update();
  }

  render() {
    return html`
      <button onclick=${this.updatePersons}>Update persons</button>
      <person-list personsData=${ this.persons }></person-list>
    `;
  }
}

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
  @Input personsData: IPersonsData = null;

  inputChanged(oldValue: IPersonsData, newValue: IPersonsData) {
    // do your operation here.
    // no need to call `this.update()` here. It may cause undesired results.
    // dont have any return value.
  }

  render(){
    ...
  }
}
```

## Data Sharing

We can even share data between two components as below:

```
  import { Component, html, Input, IHooks } from '@plumejs/core';

  @Component({
    selector: 'person-list'
  })
  class PersonsList implements IHooks {
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
  export class PersonDetails implements IHooks {

    @Input userdetails:any = {};

    inputChanged(oldValue: any, newValue: any) {
      console.log('oldvalue: ', oldValue);
      console.log('newvalue: ', newValue);
    }

    render(){
      return html`${
        <div>${this.userdetails.name}</div>
      }`
    }
  }

```

Just like react, PlumeJs provides `useRef` as references. example:

```
import { Component, Ref, useRef } from '@plumejs/core';

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

## Partial attributes

Partial attributes implementation like conditional css class modification is a breeze.
Examples:
```
// THE FOLLOWING IS OK 👍
html`<div class=${`foo ${mayBar ? 'bar' : ''}`}>Foo bar?</div>`;
html`<div class=${'foo' + (mayBar ? ' bar' : '')}>Foo bar?</div>`;
html`<div class=${['foo', mayBar ? 'bar' : ''].join(' ')}>Foo bar?</div>`;
html`<div style=${`top:${top}; left:${left};`}>x</div>`;
 
// THE FOLLOWING BREAKS ⚠️
html`<div style="top:${top}; left:${left};">x</div>`;
html`<div class="foo ${ mayBar ? 'bar' : '' }">x</div>`; // this may work in browser but will fail in unit tests
```

For more documentation check [here](https://viperhtml.js.org/hyperhtml/documentation/#essentials-7)


## Hooks
### useFormFields

`useFormFields` is very helpful to build forms and retrive form data.

example:
```
import { Component, html, useFormFields } from '@plumejs/core';
import { IMultiSelectOptions, registerMultiSelectComponent } from '@plumejs/ui';

// call in root component only.
registerMultiSelectComponent();

interface IFormFields {
  email: string;
  checkme: boolean;
  option: string;
  options: string[];
  gender: string
}

@Component(...)
class SampleForm {
  sampleformFields: IFormFields;
	createChangeHandler: any;
	multiSelectChangehandler: any;
  multiSelectOptions: IMultiSelectOptions = {
		data: ['option1', 'option2', 'option3', 'option4'],
		multiple: true,
		onchange: (optionsArr: string[]) => {
			this.multiSelectChangehandler({
				target: { 
					value: optionsArr
				}
			});
		},		
		buttonText: (options:Array<string>) => {
			if (options.length === 0) {
				return 'None selected';
			}
			else if (options.length > 3) {
				return options.length + ' selected';
			} else {
				return options.join(', ');
			}
		},
	}

  constructor() {
    const { formFields, createChangeHandler } = useFormFields<IFormFields>({
			email: "",
			checkme: false,
			option: '',
			options: [],
			gender: "",
		});
		this.sampleformFields = formFields;
		this.createChangeHandler = createChangeHandler;
		this.multiSelectChangehandler = this.createChangeHandler('options');
		this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e: Event) {
		e.preventDefault();
		console.log(this.sampleformFields);
	}

  render() {
    return html`
      <form onsubmit=${this.submitForm}>
        <div>
          <label>textbox</label>
          <input onchange=${this.createChangeHandler("email")}/>
        </div>
        <div>
          <b>radio</b>
          <input
							type="radio"
							id="gender_male"
							name="gender"
							value="male"
							onchange=${this.createChangeHandler("gender")}
						/>
						<label for="gender_male">Male</label>
						<input
							type="radio"
							id="gender_female"
							name="gender"
							value="female"
							onchange=${this.createChangeHandler("gender")}
						/>
						<label for="gender_female">Female</label>
        <div>
        <div>
          <label>checkbox</label>
          <input
							type="checkbox"
							name="gender"
							value="male"
							onchange=${this.createChangeHandler("checkme")}
						/>
        <div>
        <div>
          <label>single select</label>
          <select value=${this.sampleformFields.option} onchange=${this.createChangeHandler("option")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        <div>
        <div>
          <label>multi select</label>
          <select value=${this.sampleformFields.option} onchange=${this.createChangeHandler("option")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        <div>
        <div>
          <label>plumeui component multi select</label>
          <multi-select multiSelectOptions=${ this.multiSelectOptions }></multi-select>
        <div>
        <button type="submit" class="button is-info">Submit</button>
      </form>
    `
  }
}
```

## Creating Services

Creating service is as simple as creating a component

```
  import { Injectable } from '@plumejs/core';

  @Injectable()
  export class PersonService {
    getPersons() {
      return fetch('persons-api').then(res => res.json());
    }
  }

  // in component
  import { Component, IHooks } from '@plumejs/core';

  @Component({
    selector: 'test-ele'
  })
  class TestEle implementing IHooks {
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

## Setting up Internationalization

Adding translations in PlumeJS is a breeze. Checkout below for implementation:

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
import { Component, TranslationService } from '@plumejs/core';
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
<div>${{ html: 'html-translation'.translate() }}</div>
```

The above object inside template literal contains 'html' key which properly allow compiler to render html properly. This is to address a defect where `<div innerHTML=${ 'html-translation'.translate() }></div>` won't work properly.

For normal text translations:

```
<div>${ 'text-translation'.translate() }</div>
```

## Unit Tests

1. sample component unit test:
```
import { TestBed } from '@plumejs/core';
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

# Routing

As a scoped package one can install `@plumejs/router` for routing. For documentation check [plumejs router repo](https://github.com/KiranMantha/plumejs-router)

# UI Components

As an additional provision, `@plumejs/ui` npm module exposes a comprehensive set of useful ui components like modal dialog, notifications, multi select dropdown, toggle. You can check the documentaion [plumejs ui repo](https://github.com/KiranMantha/plumejs-ui).


An example repo can be found [here](https://github.com/KiranMantha/plumejs-example-repo) for reference.

In the memory of my beloved cousin :heartbeat: :heartbeat: :heartbeat: [Pushpak Ganti](https://www.linkedin.com/in/pushpak-ganti-3919aa10/)