import { Component, Input, html, Injectable, Router } from "../index";

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
export default class SampleEle {
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

