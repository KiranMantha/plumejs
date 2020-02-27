"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../index");
var SampleService = /** @class */ (function () {
    function SampleService() {
    }
    SampleService.prototype.testMeth = function () {
        console.log("testmethod in sample service");
    };
    SampleService = tslib_1.__decorate([
        index_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], SampleService);
    return SampleService;
}());
var TestService = /** @class */ (function () {
    function TestService(sampleSrvc) {
        this.sampleSrvc = sampleSrvc;
    }
    TestService.prototype.testMeth = function () {
        this.sampleSrvc.testMeth();
    };
    TestService.prototype.getUsers = function () {
        return fetch("https://api.github.com/users?since=135");
    };
    TestService = tslib_1.__decorate([
        index_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [SampleService])
    ], TestService);
    return TestService;
}());
var TestEle = /** @class */ (function () {
    function TestEle() {
        this.testprops = {};
    }
    TestEle.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t<div>\n\t\t\t\ttesting web component2 ", "\n\t\t\t\t<button onclick=", ">hi</button>\n\t\t\t\t<input\n\t\t\t\t\tvalue=", "\n\t\t\t\t\toninput=", "\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div>\n\t\t\t\ttesting web component2 ", "\n\t\t\t\t<button onclick=", ">hi</button>\n\t\t\t\t<input\n\t\t\t\t\tvalue=", "\n\t\t\t\t\toninput=", "\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"])), this.testprops.name, function (e) { return _this.counts(e); }, this.testprops.name, function (e) { return _this.change(e.target.value); });
    };
    TestEle.prototype.counts = function (e) {
        this.testprops.oncount("testing from click");
    };
    TestEle.prototype.change = function (val) {
        this.testprops.oncount(val);
    };
    TestEle.prototype.mount = function () {
        console.log("component loaded");
        console.log("props: ", this.testprops);
    };
    TestEle.prototype.unmount = function () {
        console.log("component unloaded");
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
    return TestEle;
}());
var SampleEle = /** @class */ (function () {
    function SampleEle(testSrvc) {
        this.testSrvc = testSrvc;
        this.test = "sample 123";
        this.outCount = this.count.bind(this);
        this.props = {
            oncount: this.outCount,
            name: this.test
        };
    }
    SampleEle.prototype.render = function () {
        return index_1.html(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t\t<div>\n\t\t\t\t<h1>Sample two way data binding</h1>\n\t\t\t\ttesting web component1 ", "\n\t\t\t\t<test-ele testprops=", "></test-ele>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div>\n\t\t\t\t<h1>Sample two way data binding</h1>\n\t\t\t\ttesting web component1 ", "\n\t\t\t\t<test-ele testprops=", "></test-ele>\n\t\t\t</div>\n\t\t"])), this.test, this.props);
    };
    SampleEle.prototype.count = function (val) {
        this.test = val;
        this.props.name = val;
        this.update();
    };
    SampleEle.prototype.beforeMount = function () {
        console.log("before mounting...");
    };
    SampleEle.prototype.mount = function () {
        console.log("component loaded");
        this.testSrvc.testMeth();
    };
    SampleEle.prototype.unmount = function () {
        console.log("component unloaded");
    };
    SampleEle = tslib_1.__decorate([
        index_1.Component({
            selector: "sample-ele"
        }),
        tslib_1.__metadata("design:paramtypes", [TestService])
    ], SampleEle);
    return SampleEle;
}());
exports.default = SampleEle;
var templateObject_1, templateObject_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlLWVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2V4YW1wbGUvc2FtcGxlLWVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBc0U7QUFHdEU7SUFDQztJQUFlLENBQUM7SUFDaEIsZ0NBQVEsR0FBUjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBSkksYUFBYTtRQURsQixrQkFBVSxFQUFFOztPQUNQLGFBQWEsQ0FLbEI7SUFBRCxvQkFBQztDQUFBLEFBTEQsSUFLQztBQUdEO0lBQ0MscUJBQW9CLFVBQXlCO1FBQXpCLGVBQVUsR0FBVixVQUFVLENBQWU7SUFBRyxDQUFDO0lBQ2pELDhCQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0MsT0FBTyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBUkksV0FBVztRQURoQixrQkFBVSxFQUFFO2lEQUVvQixhQUFhO09BRHhDLFdBQVcsQ0FTaEI7SUFBRCxrQkFBQztDQUFBLEFBVEQsSUFTQztBQUtEO0lBQUE7UUFHQyxjQUFTLEdBQVEsRUFBRSxDQUFDO0lBK0JyQixDQUFDO0lBN0JBLHdCQUFNLEdBQU47UUFBQSxpQkFXQztRQVZBLE9BQU8sWUFBSSx1UUFBQSxnREFFZ0IsRUFBbUIsNEJBQzFCLEVBQTBCLGdEQUVuQyxFQUFtQixzQkFDakIsRUFBdUMsa0NBR25ELEtBUDBCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUMxQixVQUFDLENBQU0sSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQWQsQ0FBYyxFQUVuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFDakIsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLEVBR2xEO0lBQ0gsQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBTyxDQUFNO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLEdBQVc7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHVCQUFLLEdBQUw7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5QkFBTyxHQUFQO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUE5QkQ7UUFEQyxhQUFLLEVBQUU7OzhDQUNZO0lBSGYsT0FBTztRQUhaLGlCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsVUFBVTtTQUNwQixDQUFDO09BQ0ksT0FBTyxDQWtDWjtJQUFELGNBQUM7Q0FBQSxBQWxDRCxJQWtDQztBQUtEO0lBS0MsbUJBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNmLENBQUM7SUFDSCxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNDLE9BQU8sWUFBSSwrT0FBQSw4RkFHZ0IsRUFBUyxnQ0FDWixFQUFVLGtDQUVqQyxLQUgwQixJQUFJLENBQUMsSUFBSSxFQUNaLElBQUksQ0FBQyxLQUFLLEVBRWhDO0lBQ0gsQ0FBQztJQUVELHlCQUFLLEdBQUwsVUFBTSxHQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQseUJBQUssR0FBTDtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCwyQkFBTyxHQUFQO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUF6Q21CLFNBQVM7UUFIN0IsaUJBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1NBQ3RCLENBQUM7aURBTTZCLFdBQVc7T0FMckIsU0FBUyxDQTBDN0I7SUFBRCxnQkFBQztDQUFBLEFBMUNELElBMENDO2tCQTFDb0IsU0FBUyJ9