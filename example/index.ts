// Import stylesheets
import { Component, Injectable, html, Input, Router } from "../index";

@Injectable()
export class PersonService {
	getPersons() {
		return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
			res.json()
		);
	}
}

@Component({
	selector: "persons-list"
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
		<h1>Sample service injection with http call and passing data to other component</h1>
			<div>
				<ul>
					${this.data.map(
						(user: any) =>
							html`
								<li
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


@Component({
  selector: 'app-root'
})
class AppRoot {
	constructor(private router:Router) { }
	
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

  render() {
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
      <router-outlet routes=${this.routes}></router-outlet>
    </div>
    `
  }
}