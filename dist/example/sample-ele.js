"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
let SampleService = class SampleService {
    constructor() { }
    testMeth() {
        console.log("testmethod in sample service");
    }
};
SampleService = __decorate([
    index_1.Injectable(),
    __metadata("design:paramtypes", [])
], SampleService);
let TestService = class TestService {
    constructor(sampleSrvc) {
        this.sampleSrvc = sampleSrvc;
    }
    testMeth() {
        this.sampleSrvc.testMeth();
    }
    getUsers() {
        return fetch("https://api.github.com/users?since=135");
    }
};
TestService = __decorate([
    index_1.Injectable(),
    __metadata("design:paramtypes", [SampleService])
], TestService);
let TestEle = class TestEle {
    constructor() {
        this.testprops = {};
    }
    render() {
        return index_1.html `
			<div>
				testing web component2 ${this.testprops.name}
				<button onclick=${(e) => this.counts(e)}>hi</button>
				<input
					value=${this.testprops.name}
					oninput=${(e) => this.change(e.target.value)}
				/>
			</div>
		`;
    }
    counts(e) {
        this.testprops.oncount("testing from click");
    }
    change(val) {
        this.testprops.oncount(val);
    }
    mount() {
        console.log("component loaded");
        console.log("props: ", this.testprops);
    }
    unmount() {
        console.log("component unloaded");
    }
};
__decorate([
    index_1.Input(),
    __metadata("design:type", Object)
], TestEle.prototype, "testprops", void 0);
TestEle = __decorate([
    index_1.Component({
        selector: "test-ele"
    })
], TestEle);
let SampleEle = class SampleEle {
    constructor(testSrvc) {
        this.testSrvc = testSrvc;
        this.test = "sample 123";
        this.outCount = this.count.bind(this);
        this.props = {
            oncount: this.outCount,
            name: this.test
        };
    }
    render() {
        return index_1.html `
			<div>
				<h1>Sample two way data binding</h1>
				testing web component1 ${this.test}
				<test-ele testprops=${this.props}></test-ele>
			</div>
		`;
    }
    count(val) {
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
};
SampleEle = __decorate([
    index_1.Component({
        selector: "sample-ele"
    }),
    __metadata("design:paramtypes", [TestService])
], SampleEle);
//# sourceMappingURL=sample-ele.js.map