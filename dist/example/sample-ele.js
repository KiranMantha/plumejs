"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../index");
let SampleService = class SampleService {
    constructor() { }
    testMeth() {
        console.log("testmethod in sample service");
    }
};
SampleService = tslib_1.__decorate([
    index_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
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
TestService = tslib_1.__decorate([
    index_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [SampleService])
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
tslib_1.__decorate([
    index_1.Input(),
    tslib_1.__metadata("design:type", Object)
], TestEle.prototype, "testprops", void 0);
TestEle = tslib_1.__decorate([
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
SampleEle = tslib_1.__decorate([
    index_1.Component({
        selector: "sample-ele"
    }),
    tslib_1.__metadata("design:paramtypes", [TestService])
], SampleEle);
exports.default = SampleEle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLWVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2V4YW1wbGUvc2FtcGxlLWVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBc0U7QUFHdEUsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQUNsQixnQkFBZSxDQUFDO0lBQ2hCLFFBQVE7UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNELENBQUE7QUFMSyxhQUFhO0lBRGxCLGtCQUFVLEVBQUU7O0dBQ1AsYUFBYSxDQUtsQjtBQUdELElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVc7SUFDaEIsWUFBb0IsVUFBeUI7UUFBekIsZUFBVSxHQUFWLFVBQVUsQ0FBZTtJQUFHLENBQUM7SUFDakQsUUFBUTtRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFFBQVE7UUFDUCxPQUFPLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRCxDQUFBO0FBVEssV0FBVztJQURoQixrQkFBVSxFQUFFOzZDQUVvQixhQUFhO0dBRHhDLFdBQVcsQ0FTaEI7QUFLRCxJQUFNLE9BQU8sR0FBYixNQUFNLE9BQU87SUFBYjtRQUdDLGNBQVMsR0FBUSxFQUFFLENBQUM7SUErQnJCLENBQUM7SUE3QkEsTUFBTTtRQUNMLE9BQU8sWUFBSSxDQUFBOzs2QkFFZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO3NCQUMxQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2FBRW5DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtlQUNqQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7O0dBR25ELENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQU07UUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE9BQU87UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNELENBQUE7QUEvQkE7SUFEQyxhQUFLLEVBQUU7OzBDQUNZO0FBSGYsT0FBTztJQUhaLGlCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsVUFBVTtLQUNwQixDQUFDO0dBQ0ksT0FBTyxDQWtDWjtBQUtELElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBUztJQUs3QixZQUFvQixRQUFxQjtRQUFyQixhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDZixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDTCxPQUFPLFlBQUksQ0FBQTs7OzZCQUdnQixJQUFJLENBQUMsSUFBSTswQkFDWixJQUFJLENBQUMsS0FBSzs7R0FFakMsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsR0FBVztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFdBQVc7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTztRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0QsQ0FBQTtBQTFDb0IsU0FBUztJQUg3QixpQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFlBQVk7S0FDdEIsQ0FBQzs2Q0FNNkIsV0FBVztHQUxyQixTQUFTLENBMEM3QjtrQkExQ29CLFNBQVMifQ==