// Import stylesheets
//https://codepen.io/jovdb/pen/vdZmEz?editors=0010#0
import { Component, Injectable, html, Input, Router, Route, useRef, Ref, TranslationService } from "../index";
import * as en from './i18n/en';
import * as fr from './i18n/fr';


let person_style = require('./persons-list.scss');
let main = require('./main.scss');


@Component({
	selector: 'app-root',
	root: true,
	styles: main
})
class AppRoot {
	constructor(private router:Router, translations:TranslationService) {
		translations.setTranslate(en, 'en');
		translations.setTranslate(fr, 'fr');
		translations.setDefaultLanguage('en');
	}

	inputField:Ref<null> | undefined;
	
  routes:Array<Route> = [
		{
			path: '',
			redirectTo: '/home'
		},
		{
			path: '/home',
			template: `<sample-ele></sample-ele>`
		},
		{
			path: '/persons/:id',
			template: `<persons-list></persons-list>`
		}
	]
	
	navigate = (path:string) => {
    this.router.navigateTo(path);
	}
	
	getRef(){
		console.log(this.inputField);
	}

  render() {
		this.inputField = useRef(null);
    return html`
		 <div>
			<ul>
				<li>
					<a onclick=${() => { this.navigate('/home') }}>Home</a>
				</li>
				<li>
					<a onclick=${() => { this.navigate('/persons/123') }}>persons</a>
				</li>
			</ul>	
			<router-outlet routes=${ this.routes }></router-outlet>
			<input type='text' ref=${this.inputField} /><button onclick=${()=>{ this.getRef() }}>click</button>
    </div>
    `
  }
}


@Injectable()
export class PersonService {
	getPersons() {
		return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
			res.json()
		);
	}
}

@Component({
	selector: "persons-list",
	styles: person_style
})
class PersonsList {
	data: Array<string> = [];
	persondetails: any = {};
	update: any;
	element: any;
	constructor(private personSrvc: PersonService, private router:Router) {
		console.log('current route ', this.router.getCurrentRoute());
	}
	mount() {
		this.personSrvc.getPersons().then(data => {
			this.data = data;
			this.update(); // triggers change detection and update view
		});
	}

	alertName(user: any) {
		this.persondetails = user;
		this.update();
	}

	render() {
		return html`
		<h4>Sample service injection with http call and passing data to other component</h4>
		<div innerHTML='${ '10300'.translate('fr') }'></div>		
			<div>
				<ul class="list-group">
					${this.data.map(
						(user: any) =>
							html`
								<li class="list-group-item"
									onclick=${() => {
										this.alertName(user);
									}}
								>
									${user.name}
								</li>
							`
					)}
				</ul>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`;
	}
}

@Component({
	selector: "person-details"
})
export class PersonDetails {
	@Input()
	userDetails: any = {};

	render() {
		console.log("selected: user", this.userDetails);
		if (this.userDetails.name) {
			return html`
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>						
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
						<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Password</label>
						<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
					</div>
					<div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="exampleCheck1">
						<label class="form-check-label" for="exampleCheck1">Check me out</label>
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			`;
		} else {
			return html``;
		}
	}
}

@Injectable()
class SampleService {
	constructor() {}
	testMeth() {
		console.log("testmethod in sample service");
	}
}

@Injectable()
class TestService {
	constructor(private sampleSrvc: SampleService) {}
	testMeth() {
		this.sampleSrvc.testMeth();
	}

	getUsers() {
		return fetch("https://api.github.com/users?since=135");
	}
}

@Component({
	selector: "test-ele"
})
class TestEle {
	update: any;
	@Input()
	testprops: any = {};

	render() {
		return html`
			<div>
				testing web component2 ${this.testprops.name}
				<button onclick=${(e: any) => this.counts(e)}>hi</button>
				<input
					value=${this.testprops.name}
					oninput=${(e: any) => this.change(e.target.value)}
				/>
			</div>
		`;
	}

	counts(e: any) {
		this.testprops.oncount("testing from click");
	}

	change(val: string) {
		this.testprops.oncount(val);
	}

	mount() {
		console.log("component loaded");
		console.log("props: ", this.testprops);
	}

	unmount() {
		console.log("component unloaded");
	}
}

@Component({
	selector: "sample-ele"
})
class SampleEle {
	test: string;
	outCount: Function;
	update: any;
	props: any;
	constructor(private testSrvc: TestService) {
		this.test = "sample 123";
		this.outCount = this.count.bind(this);
		this.props = {
			oncount: this.outCount,
			name: this.test
		};
	}

	render() {
		return html`
			<div>
				<h1>Sample two way data binding</h1>
				testing web component1 ${this.test}
				<test-ele testprops=${this.props}></test-ele>
			</div>
		`;
	}

	count(val: string) {
		this.test = val;
		this.props.name = val;
		this.update();
	}

	beforeMount() {
		console.log("before mounting...");
	}

	mount() {
		console.log("component loaded");
		this.testSrvc.testMeth();
	}

	unmount() {
		console.log("component unloaded");
	}
}

