import { __decorate, __metadata } from "tslib";
import { Component, Input, html, Injectable } from "../index";
let SampleService = class SampleService {
    constructor() { }
    testMeth() {
        console.log("testmethod in sample service");
    }
};
SampleService = __decorate([
    Injectable(),
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
    Injectable(),
    __metadata("design:paramtypes", [SampleService])
], TestService);
let TestEle = class TestEle {
    constructor() {
        this.testprops = {};
    }
    render() {
        return html `
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
    Input(),
    __metadata("design:type", Object)
], TestEle.prototype, "testprops", void 0);
TestEle = __decorate([
    Component({
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
        return html `
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
    Component({
        selector: "sample-ele"
    }),
    __metadata("design:paramtypes", [TestService])
], SampleEle);
export default SampleEle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLWVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2V4YW1wbGUvc2FtcGxlLWVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBVSxNQUFNLFVBQVUsQ0FBQztBQUd0RSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBQ2xCLGdCQUFlLENBQUM7SUFDaEIsUUFBUTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0QsQ0FBQTtBQUxLLGFBQWE7SUFEbEIsVUFBVSxFQUFFOztHQUNQLGFBQWEsQ0FLbEI7QUFHRCxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0lBQ2hCLFlBQW9CLFVBQXlCO1FBQXpCLGVBQVUsR0FBVixVQUFVLENBQWU7SUFBRyxDQUFDO0lBQ2pELFFBQVE7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRO1FBQ1AsT0FBTyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0QsQ0FBQTtBQVRLLFdBQVc7SUFEaEIsVUFBVSxFQUFFO3FDQUVvQixhQUFhO0dBRHhDLFdBQVcsQ0FTaEI7QUFLRCxJQUFNLE9BQU8sR0FBYixNQUFNLE9BQU87SUFBYjtRQUdDLGNBQVMsR0FBUSxFQUFFLENBQUM7SUErQnJCLENBQUM7SUE3QkEsTUFBTTtRQUNMLE9BQU8sSUFBSSxDQUFBOzs2QkFFZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO3NCQUMxQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2FBRW5DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtlQUNqQixDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7O0dBR25ELENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLENBQU07UUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE9BQU87UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNELENBQUE7QUEvQkE7SUFEQyxLQUFLLEVBQUU7OzBDQUNZO0FBSGYsT0FBTztJQUhaLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxVQUFVO0tBQ3BCLENBQUM7R0FDSSxPQUFPLENBa0NaO0FBS0QsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFTO0lBSzdCLFlBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNmLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNMLE9BQU8sSUFBSSxDQUFBOzs7NkJBR2dCLElBQUksQ0FBQyxJQUFJOzBCQUNaLElBQUksQ0FBQyxLQUFLOztHQUVqQyxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsV0FBVztRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsS0FBSztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRCxDQUFBO0FBMUNvQixTQUFTO0lBSDdCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxZQUFZO0tBQ3RCLENBQUM7cUNBTTZCLFdBQVc7R0FMckIsU0FBUyxDQTBDN0I7ZUExQ29CLFNBQVMifQ==