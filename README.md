[![GitHub contributors](https://img.shields.io/github/contributors/kiranmantha/plumejs)](https://GitHub.com/KiranMantha/plumejs/graphs/contributors/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://GitHub.com/KiranMantha/plumejs/pulls)

[![npm](https://img.shields.io/npm/dw/@plumejs/core)](https://www.npmjs.com/package/@plumejs/core) [![npm](https://img.shields.io/npm/v/@plumejs/core)](https://www.npmjs.com/package/@plumejs/core)

![](./logo.svg)

Demo [here](https://kiranmantha.github.io/plumejs-example-repo/). Check console logs for further details.

Example [repo](https://github.com/KiranMantha/plumejs-example-repo/)

Intro for dual packages [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)

PlumeJs is a very light weight typescript framework to build spa's. It is build on more accessable web components, typescript. It comes with features like change detection during async operations, data-sharing via services and props, dependency injection.

PlumeJs is a conceptual combination of angularjs and react. Just like angular one can register `Services`, `Components` and `life-cycle hooks`. It has `setProps` and `onbindprops` for passing data from one component to another and like react `update` function to update the view after modal updations and a `render` function to render the component.

PlumeJs has very few syntaxes enabling faster learning curve.

To start with PlumeJs

# Yo Plumejs

Plumejs has yeoman generator which provides the entire scaffolding for your project. To start with:

1. Require Nodejs version 11.0.0 or above
2. Run `npm install -g yo generator-plumejs`
3. After completing installation run `yo plumejs` in your destination folder. This will ask you about your project name, description and type of bundler for your project. After that it will install all the required dependencies.
4. After all the dependencies were installed, you can run application using command `npm start`.

# Starter templates

If you don't want to start with `yo plumejs` and need to use either with webpack or vite specifically then please check 

1. [PlumeJS webpack template](https://github.com/KiranMantha/plumejs-webpack-template)
2. [PlumeJS vite template](https://github.com/KiranMantha/plumejs-vite-template)

# What's new 

## in 3.2.1 version
PlumeJS internally makes use of `CSSStyleSheet` constructor to enable styling of webcomponents. As this is relatively newer technology (which supports only in Chrome, Edge & Mozilla), this update provides better fallback mechanism if a browser doesn't support `CSSStyleSheet` constructor. Along with this, the new update also brings improvements to `useFormFields` hook which was introduced in `v3.0.0`. The feature upgrade for this hook enables developers to pass a single or multiple validators for a form field (Just like validations in reactive forms in angular for instance). It also brings a new `Form` interface which provides apis like: 

1. `form.value` returns an object of form field name and value as key-value pair.
2. `form.valid` to check the validity of the form.
3. `form.errors` is a `Map` containing field name as key and error object as value. Developer can query this map for a field to extract errors easily. This also used to display summary of error messages.
4. `form.get(<-your-field-name->)` to read a form field's value or errors or validators.
5. `form.reset()` to reset the form to initial state. 

One advantage of this newer `Form` interface is `form.errors` which gives developers the error summary of all form fields.

```javascript
  form: Form;
  ...
  [this.form, this.createChangeHandler] = useFormFields({...});
```

Not all is good. The newer inplementation brings slight inconvinience.

Before the update, the sample form looks like this:

```javascript
import { Component, html, useFormFields } from '@plumejs/core';

interface IFormFields {
  email: string;
  checkme: boolean;
  option: string;
  gender: string
}

@Component(...)
class SampleForm {
  sampleformFields: IFormFields;
	createChangeHandler: any;

  constructor() {
    [ this.sampleformFields, this.createChangeHandler, this.resetFormFields ] = useFormFields<IFormFields>({
			email: "",
			checkme: false,
			option: '',
			gender: "",
		});
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
        <button type="submit" class="button is-info">Submit</button>
      </form>
    `
  }
}
```

From the new version, the implementation looks like this:

```javascript
import { Component, html, useFormFields, Form } from '@plumejs/core';

interface IFormFields {
  email: string;
  checkme: boolean;
  option: string;
  options: string[]
  gender: string
}

@Component(...)
class SampleForm {
  sampleform: Form<IFormFields>;
	createChangeHandler: any;

  constructor() {
    [this.sampleform, this.createChangeHandler] = useFormFields<IFormFields>({
			email: "",
			checkme: false,
			option: '',
      options: [['1', '2']] //this syntax is must for multi-select dropdown options
			gender: "",
		});
		this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e: Event) {
		e.preventDefault();
		console.log(this.sampleform.value);
	}

  reset() {
    this.sampleForm.reset();
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
          <select value=${this.sampleform.get('option').value} onchange=${this.createChangeHandler("option")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        <div>
        <div>
          <label>multi select</label>
          <select multiple value=${this.sampleform.get('options').value} onchange=${this.createChangeHandler("options")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        <div>
        <button type='button' onclick=${() => this.reset()}>Reset</button>
        <button type="submit" class="button is-info">Submit</button>
      </form>
    `
  }
}
```

Previously, `useFormFields` also returns `resetFormFields` function to reset the form. But with the introduction of `Form` interface, this function becomes redundant and will be removed in future versions.

The new update also brings one notable feature called `standalone` components. Standalone components doesn't rely on any type of global styles apart from inheriting fonts. Such components design is purely dictated by their own styles. This doesn't mean like developers have to write components in different manner :wink:. 

```
@Component({
  selector: 'my-app',
  styles: '',
  standalone: true
})
class YourComponent {...}
```

That's it. a new `standalone` property in component decorator options make your component standalone.

Translations which are built-in core module is removed. Instead devs are encouraged to check docs on how to setup translations manually. The intention behind this change is to make PlumeJS almost dependency free (few polyfills are needed here and then for unsupported features). Hope you welcome this change.

## in 3.1.1 version
Previously PlumeJS rely on reflection for DI. But as javascript itself won't provide reflection metadata at minification phase, Dev has to supply that metadata. Well this is a small inconvinience but this enables devs to use their preferred bundlers like rollup/esbuild/vite/swc which won't rely on reflection which inturn reduce the bundle size. PlumeJS will itself move to [vite](https://vitejs.dev/) which leads to way smaller builds when compared with webpack.

## in 3.0.0 version

Plumejs is now moving to scoped packages, deprecating older versions. In the process it shed 50% in size and dependencies compared to its previous versions. The `core aka @plumejs/core` scope is now only ~50KB and acts more as a library instead of a framework. So the devs can plugin `router aka @plumejs/router` scope for routing, `ui aka @plumejs/ui` scope for built in controls and more to come.

The new version adds a new `Renderer` api which, on dependency injected in component constructor, will provide `update` function to update a component, `emitEvent` function to emit an output event to pass data from child to parent and `shadowRoot` to query dom nodes.

It also adds a new `ComponentRef` api which takes a component class as generic type and

1. expose `setProps` function which is used to set input properties of a child component which are declared as `ObservedProperties` and
2. `getInstance` function to get current instance of child component.

`useFormFields` now returns an array instead of object. This change makes it in-line with `useState`. This helps in assigning values directly in array instead of creating new variables and reassigning them. Now `useFormFields` also provides a `resetFormFields` function which resets all form values. for example:

```javascript
  [this.formFields, this.createChangeHandler, this.resetFormFields] = useFormFields({...});
```

# Breaking Change

## in 3.0.0 version

1. `Input` decorator is removed in favor of `setProps` for better type safe of props.
2. Inorder to update a component previously dev need to declare `update` property and call it as a function. But now dev needs to inject `Renderer` and call `renderer.update()` in the component. This helps linters to not throw error for usage of uninitialized variables and usage of `any`.
3. `useRef` is deprecated. instead use `<input ref=${(node) => { this.ref = node; }}/>`. this prevents additional chaining like `this.ref.current.<do-some-operation>` instead user can do `this.ref.<do-some-operation>` which is more meaningful.

## from 2.2.2 version

There is a breaking change in component declaration. Check below:

```typescript
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

```javascript
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

```typescript
import { Component, html } from '@plumejs/core';
import testEleStyles from './test-ele.scss';

@Component({
  selector: 'test-ele',
  styleUrl: testEleStyles,
  root: true
})
class TestEle {
  test: string;

  constructor() {
    this.text = 'hello world!';
  }

  render() {
    return html`<div>${this.text}</div>`;
  }
}
```

Note: Through out the entire application there will be only one root component. Adding more than one root component will not render the page and throw duplicate root component error.

For styling one can use css or scss formats. but scss is the most preferred one. By default all plumejs components are render as block elements. They internally have `:host { display: block; }` property.

## Lifecycle Hooks

`IHooks` interface provides `mount, unmount, onPropsChanged & ObservedProperties` lifecycle hooks.

### mount Hook

It is used to perform model data initialization as follows:

```typescript
import { Component, html, IHooks } from '@plumejs/core';

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
  data: Array<string> = [];

  constructor() {}

  mount() {
    fetch('persons-api')
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.update(); // triggers change detection and update view
      });
  }

  alertName(name: string) {
    alert(name);
  }

  render() {
    return html`<div>
      <ul>
        ${this.data.map(
          (item: string) =>
            html`<li
              onclick=${() => {
                this.alertname(item);
              }}
            >
              ${item}
            </li>`
        )}
      </ul>
    </div>`;
  }
}
```

### umount Hook

It is used to execute any pendending subscriptions as follows:

```typescript
import { Component, html, IHooks } from '@plumejs/core';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
  data: Array<string> = [];
  mySubscription: Observable;

  constructor() {}

  mount() {
    this.mySubscription = from(fetch('persons-api').then((res) => res.json()));

    this.mySubscription.subscribe((data) => {
      this.data = data;
      this.update(); // triggers change detection and update view
    });
  }

  unmount() {
    this.mySubscription.unsubscribe();
  }

  alertName(name: string) {
    alert(name);
  }

  render() {
    return html`<div>
      <ul>
        ${this.data.map(
          (item: string) =>
            html`<li
              onclick=${() => {
                this.alertname(item);
              }}
            >
              ${item}
            </li>`
        )}
      </ul>
    </div>`;
  }
}
```

### onPropsChanged Hook with ObservedProperties

It is called when ever the parent component called `setProps` on child component.

```typescript
import { Component, html, ComponentRef, IHooks } from '@plumejs/core';

@Component({
  selector: 'app-root'
})
class App {
  persons: IPersonsData;
  personsListRef: ComponentRef<PersonsList>;

  updatePersons() {
    // directly updating persons array will not update UI. so creating new array.
    this.persons = [...this.persons, new person record];
    this.personsListRef.setProps({ personsData: this.persons });
  }

  render() {
    return html`
      <button onclick=${() => { this.updatePersons(); }}>Update persons</button>
      <person-list ref=${(node) => { this.personsListRef = node; }}></person-list>
    `;
  }
}

@Component({
  selector: 'person-list'
})
class PersonsList implements IHooks {
  readonly ObservedProperties = <const>['personsData'];

  personsData: IPersonsData;

  onPropsChanged(oldValue: IPersonsData, newValue: IPersonsData) {
    // do your operation here.
    // no need to call `this.renderer.update()` here. It may cause undesired results.
    // dont have any return value.
  }

  render(){
    ...
  }
}
```

## Data Sharing

A prent component can pass data to children in two ways:

1. Read the rendered component as `ComponentRef` and call setprops. this is more helpful if component props depends on api.
2. Use `onbindprops` event on component. this is more helpful incase of loops.

### 1. Passing data using ComponentRef

```typescript
  import { Component, html, ComponentRef, Renderer, IHooks } from '@plumejs/core';

  @Component({
    selector: 'person-list',
    deps: [Renderer]
  })
  class PersonsList implements IHooks {
    data:Array<string> = [];
    persondetails:{ name: string; } = { name: '' };
    personDetailsRef: ComponentRef<PersonDetails>;

    constructor(private renderer: Renderer){}

    mount(){
      fetch('persons-api').then(res => res.json()).then(data => {
        this.data = data;
        this.renderer.update(); // triggers change detection and update view
      })
    }

    alertName(name:string){
      this.persondetails.name = name;
      this.personDetailsRef.setProps({ userdetails: this.persondetails }); // update the child component
    }

    render(){
      return html`<div>
        <ul>${
          this.data.map((item:string) => html`<li onclick=${()=>{ this.alertname(item); }}>${item}</li>`)
        }</ul>
        <person-details ref=${(node) => { this.personDetailsRef = node; }}></person-details>
      </div>`
    }
  }

  @Component({
    selector: 'person-details'
  })
  export class PersonDetails implements IHooks {
    readonly ObservedProperties = <const>['userDetails'];
    userDetails: { name: string; };

    onPropsChanged(oldValue: any, newValue: any) {
      console.log('oldvalue: ', oldValue);
      console.log('newvalue: ', newValue);
    }

    render(){
      if (this.userDetails && this.userDetails.name) {
        return html`${
          <div>${this.userdetails.name}</div>
        }`
      } else {
        return html`<div></div>`
      }
    }
  }

```

### 2. Passing data using onbindprops

```typescript
import { Component, html, ComponentRef, Renderer, IHooks, InputProps } from '@plumejs/core';

  @Component({
    selector: 'person-list',
    deps: [Renderer]
  })
  class PersonsList implements IHooks {
    data:Array<string> = [];
    persondetails:{ name: string; } = { name: '' };
    personDetailsRef: ComponentRef<PersonDetails>;

    constructor(private renderer: Renderer){}

    mount(){
      fetch('persons-api').then(res => res.json()).then(data => {
        this.data = data;
        this.renderer.update(); // triggers change detection and update view
      })
    }

    alertName(name:string){
      this.persondetails.name = name;
      this.personDetailsRef.setProps({ userdetails: this.persondetails }); // update the child component
    }

    render(){
      return html`<div>
        <ul>${
          this.data.map((item) => {
            return html`
              <person-list-item onbindprops=${(): InputProps<PersonListItem> => ({ person: item })} 
                onpersonclick=${(e) => {
                  this.alertname(e.detail.person);
                }}
              >
              </person-list-item>
            `
          })
        }</ul>
        <person-details ref=${(node) => { this.personDetailsRef = node; }}></person-details>
      </div>`
    }
  }

  @Component({
    selector: 'person-list-item',
    styles: `
      :host {
        display: list-item;
      }
    `,
    deps: [Renderer]
  })
  class PersonListItem implements IHooks {
    readonly ObservedProperties = <const>['person'];
    person: string;

    constructor(renderer: Renderer) {}

    render() {
      return html`
        <div onclick=${() => {
          this.renderer.emitEvent('personclick', {name: person})
        }}>${this.person}</div>
      `
    }
  }

  @Component({
    selector: 'person-details'
  })
  export class PersonDetails implements IHooks {
    readonly ObservedProperties = <const>['userDetails'];
    userDetails: { name: string; };

    onPropsChanged(oldValue: any, newValue: any) {
      console.log('oldvalue: ', oldValue);
      console.log('newvalue: ', newValue);
    }

    render(){
      if (this.userDetails && this.userDetails.name) {
        return html`${
          <div>${this.userdetails.name}</div>
        }`
      } else {
        return html`<div></div>`
      }
    }
  }
```

`UseRef` is deprecated. instead follow:

```typescript
import { Component } from '@plumejs/core';

@Component({
  selector: 'sample-comp'
})
class SampleComp {
  inputField: Ref<HTMLElement> = useRef(null); // deprecated
  inputField: HTMLElement;

  getRef() {
    console.log(this.inputField);
  }

  render() {
    return html`
      <div>
        <input type="text" ref=${this.inputField} /> // don't use this way
        <input
          type="text"
          ref=${(node) => {
            this.inputField = node;
          }}
        />
        // use ref like this
        <button
          onclick=${() => {
            this.getRef();
          }}
        >
          click
        </button>
      </div>
    `;
  }
}
```

## Partial attributes

Partial attributes implementation like conditional css class modification is a breeze.
Examples:

```javascript
// THE FOLLOWING IS OK 👍
html`<div class=${`foo ${mayBar ? 'bar' : ''}`}>Foo bar?</div>`;
html`<div class=${'foo' + (mayBar ? ' bar' : '')}>Foo bar?</div>`;
html`<div class=${['foo', mayBar ? 'bar' : ''].join(' ')}>Foo bar?</div>`;
html`<div style=${`top:${top}; left:${left};`}>x</div>`;

// THE FOLLOWING BREAKS ⚠️
html`<div style="top:${top}; left:${left};">x</div>`;
html`<div class="foo ${mayBar ? 'bar' : ''}">x</div>`; // this may work in browser but will fail in unit tests
```

For more documentation check [here](https://viperhtml.js.org/hyperhtml/documentation/#essentials-7)

## Hooks

### useFormFields

`useFormFields` is very helpful to build forms, validate and retrive form data.

Built-in validators:

1. Validators.required
2. Validators.min
3. Validators.max
4. Validators.pattern

example:

```typescript
import { Component, html, useFormFields, Form, Validators } from '@plumejs/core';
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
  sampleform: Form<IFormFields>;
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
    [ this.sampleform, this.createChangeHandler ] = useFormFields<IFormFields>({
			email: ["", Validators.required, Validators.pattern(/^[a-z0-9]((\.|\+)?[a-z0-9]){5,}@gmail\.com$/)],
			checkme: false,
			option: '',
			options: [],
			gender: "",
		});
		this.multiSelectChangehandler = this.createChangeHandler('options');
		this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e: Event) {
		e.preventDefault();
		console.log(this.sampleform);
	}

  reset() {
    this.sampleForm.reset();
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
          <select value=${this.sampleform.get('option').value} onchange=${this.createChangeHandler("option")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        <div>
        <div>
          <label>multi select</label>
          <select multiple value=${this.sampleform.get('options').value} onchange=${this.createChangeHandler("options")}>
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
        <button onclick=${() => this.reset()}>Reset</button>
        <button type="submit" class="button is-info">Submit</button>
      </form>
    `
  }
}
```

## Creating Services

Creating service is as simple as creating a component

```typescript
  import { Injectable } from '@plumejs/core';

  @Injectable()
  export class SampleService {
    getData() {
      return fetch('persons-api').then(res => res.json());
    }
  }

  @Injectable({ deps: [SampleService] })
  export class PersonService {
    constructor(private sampleService: SampleService) {}
    getPersons() {
      return this.sampleService.getData();
    }
  }

  // in component
  import { Component, IHooks, Renderer } from '@plumejs/core';

  @Component({
    selector: 'test-ele',
    deps: [PersonService, Renderer]
  })
  class TestEle implementing IHooks {
    test:string;
    data:Array<string> = [];

    constructor(private personSrvc:PersonService, private renderer: Renderer){
      this.text = 'hello world!'
    }

    mount(){
      this.personSrvc.getPersons().then(data => {
        this.data = data;
        this.renderer.update(); // triggers change detection and update view
      })
    }

    ...
  }
```

Services in PlumeJs are singleton

> :warning: Always make sure that the order of deps and constructor arguments is same. The system won't check for types at compile time which will cause defects at runtime.

## Setting up Internationalization

In previous versions translations are baked into the core module but from this version onwards it is removed from core build to reduce overhead as it is an optional feature. But this doesn't mean that setting up translations will end up in loops. Follow the below steps to easily set it up.

1. add `i18n` folder to your src folder (you can name it as per your standards)

```
src
 |- i18n
      |-en.ts
      |-fr.ts

```

2. add translation files to i18n folder

```typescript
//en.ts
const locale_en = {
  'user': {
    'name': 'My name is {name}'
  }
}
export default locale_en;

//fr.ts
const locale_fr = {
  'user': {
    'name': 'je m`appelle {name}'
  }
}
export default locale_fr;
```

3. install [vanilla-i18n](https://www.npmjs.com/package/vanilla-i18n) package using `npm i -S vanilla-i18n`.

4. this package did not contain types. for that:

  * create `vanilla-i18n` folder to `@types` folder located at project root. 
  ```
  <rootDir>
    |-@types
    |   |-vanilla-i18n
    |          |-index.d.ts 
    |-src
  ```
  * create `index.d.ts` file to above folder and add below snippet:

    ```typescript
    /// <reference types="node" />
    declare module 'vanilla-i18n' {
      export function setDefaultLanguage(language: string): void;
      export function setTranslate(obj: any, language: string): void;
    }
    ```

5. after above setup, add the below service file to your project
```
<rootDir>
  |-src
     |-index.ts
     |-translationService.ts
```

```typescript
//translationService.ts
import { setDefaultLanguage, setTranslate } from 'vanilla-i18n';
import { Injectable } from './decorators';

@Injectable()
export class TranslationService {
  private _defaultLanguage = '';

  setTranslate(i18n: Record<string, any>, lang: string) {
    setTranslate(i18n, lang);
  }

  setDefaultLanguage(language: string) {
    this._defaultLanguage = language;
    setDefaultLanguage(language);
    const event = new CustomEvent('onLanguageChange');
    window.dispatchEvent(event);
  }

  getCurrentLanguage() {
    return this._defaultLanguage;
  }
}

```

6. import translation files in root component and pass them to translation service

```typescript
//index.ts or your root component file
import { Component } from '@plumejs/core';
import { TranslationService } from './translationService.ts'
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

7. now translations setup is done for english and french languages.

8. To pass html from translations, no need to follow special ways:

```html
// previously
<div>${{ html: 'html-translation'.translate() }}</div>

// with new version just like normal translation
<div>${ 'html-translation'.translate() }</div>
```

> :warning: using translations via innerHTML will not work. `<div innerHTML=${ 'html-translation'.translate() }></div>` won't work properly.

For normal text translations:

```html
<div>${ 'text-translation'.translate() }</div>
```

## Unit Tests

1. sample component unit test:

```typescript
import { TestBed, Fixture } from '@plumejs/core';
import { AppComponent } from 'src';

describe('Plumejs Component', () => {
  let appRoot: Fixture<AppComponent>;
  let model: AppComponent;

  beforeAll(async () => {
    appRoot = await TestBed.MockComponent(AppComponent);
    model = appRoot.componentInstance;
  });

  it('should render h1 element', () => {
    const h1: any = appRoot.element.querySelector('h1');
    expect(h1.innerHTML).toBe('Hello World');
  });

  it('should return "hello" on button click', () => {
    let span = appRoot.element.querySelector('span');
    expect(span.innerHTML).not.toContain('hello');
    model.greet();
    expect(span.innerHTML).toContain('hello');
  });

  afterAll(() => {
    TestBed.RemoveComponent(appRoot);
  });
});
```

2. sample service unit test:

```typescript
class SampleService {
  data: any = {};

  callApi() {
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((res: any) => res.json())
      .then((res: any) => {
        this.data = res;
      });
  }
}

describe('Plumejs Service', () => {
  let servc: SampleService;
  let _fetch: any = fetch;

  beforeAll(() => {
    servc = new SampleService();
  });

  beforeEach(() => {
    _fetch.resetMocks();
  });

  it('should work', async () => {
    _fetch.mockResponseOnce(
      JSON.stringify({
        animals: ['cow', 'goat', 'lion']
      })
    );
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

# Usage in VanillaJS

If you don't want to use typescript but still want to use plumejs? no problem it got you covered. You can refer [plumejs-esnext](https://github.com/KiranMantha/plumejs-esnext) and use any of below formats from `dist` folder:

```cmd
plume.es.js   24.08 KiB / gzip: 6.39 KiB
plume.umd.js   11.30 KiB / gzip: 4.63 KiB
plume.iife.js   11.11 KiB / gzip: 4.56 KiB
```

The apis are same and consume them as `PlumeJs.Component` / `PlumeJS.Service` etc..(albeit without decorators)

> In the memory of my beloved late cousin :heartbeat: :heartbeat: :heartbeat: [Pushpak Ganti](https://www.linkedin.com/in/pushpak-ganti-3919aa10/)
