"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../index");
var PersonService = (function () {
    function PersonService() {
    }
    PersonService.prototype.getPersons = function () {
        return fetch("https://jsonplaceholder.typicode.com/users").then(function (res) {
            return res.json();
        });
    };
    PersonService = tslib_1.__decorate([
        index_1.Injectable()
    ], PersonService);
    return PersonService;
}());
exports.PersonService = PersonService;
var PersonsList = (function () {
    function PersonsList(personSrvc, router) {
        this.personSrvc = personSrvc;
        this.router = router;
        this.data = [];
        this.persondetails = {};
        console.log('current route ', this.router.getCurrentRoute());
    }
    PersonsList.prototype.mount = function () {
        var _this = this;
        this.personSrvc.getPersons().then(function (data) {
            _this.data = data;
            _this.update();
        });
    };
    PersonsList.prototype.alertName = function (user) {
        this.persondetails = user;
        this.update();
    };
    PersonsList.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t<h1>Sample service injection with http call and passing data to other component</h1>\n\t\t\t<div>\n\t\t\t\t<ul>\n\t\t\t\t\t", "\n\t\t\t\t</ul>\n\t\t\t\t<person-details\n\t\t\t\t\tid=\"person-details\"\n\t\t\t\t\tuserDetails=", "\n\t\t\t\t></person-details>\n\t\t\t</div>\n\t\t"], ["\n\t\t<h1>Sample service injection with http call and passing data to other component</h1>\n\t\t\t<div>\n\t\t\t\t<ul>\n\t\t\t\t\t",
            "\n\t\t\t\t</ul>\n\t\t\t\t<person-details\n\t\t\t\t\tid=\"person-details\"\n\t\t\t\t\tuserDetails=", "\n\t\t\t\t></person-details>\n\t\t\t</div>\n\t\t"])), this.data.map(function (user) {
            return index_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\tonclick=", "\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t"], ["\n\t\t\t\t\t\t\t\t<li\n\t\t\t\t\t\t\t\t\tonclick=",
                "\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t"])), function () {
                _this.alertName(user);
            }, user.name);
        }), this.persondetails);
    };
    PersonsList = tslib_1.__decorate([
        index_1.Component({
            selector: "persons-list"
        }),
        tslib_1.__metadata("design:paramtypes", [PersonService, index_1.Router])
    ], PersonsList);
    return PersonsList;
}());
var PersonDetails = (function () {
    function PersonDetails() {
        this.userDetails = {};
    }
    PersonDetails.prototype.render = function () {
        console.log("selected: user", this.userDetails);
        if (this.userDetails.name) {
            return index_1.html(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n\t\t\t\t<div>Name: ", "</div>\n\t\t\t\t<div>Company: ", "</div>\n\t\t\t"], ["\n\t\t\t\t<div>Name: ", "</div>\n\t\t\t\t<div>Company: ", "</div>\n\t\t\t"])), this.userDetails.name, this.userDetails.company.name);
        }
        else {
            return index_1.html(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject([""], [""])));
        }
    };
    tslib_1.__decorate([
        index_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PersonDetails.prototype, "userDetails", void 0);
    PersonDetails = tslib_1.__decorate([
        index_1.Component({
            selector: "person-details"
        })
    ], PersonDetails);
    return PersonDetails;
}());
exports.PersonDetails = PersonDetails;
var SampleService = (function () {
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
var TestService = (function () {
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
var TestEle = (function () {
    function TestEle() {
        this.testprops = {};
    }
    TestEle.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n\t\t\t<div>\n\t\t\t\ttesting web component2 ", "\n\t\t\t\t<button onclick=", ">hi</button>\n\t\t\t\t<input\n\t\t\t\t\tvalue=", "\n\t\t\t\t\toninput=", "\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div>\n\t\t\t\ttesting web component2 ", "\n\t\t\t\t<button onclick=", ">hi</button>\n\t\t\t\t<input\n\t\t\t\t\tvalue=", "\n\t\t\t\t\toninput=", "\n\t\t\t\t/>\n\t\t\t</div>\n\t\t"])), this.testprops.name, function (e) { return _this.counts(e); }, this.testprops.name, function (e) { return _this.change(e.target.value); });
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
var SampleEle = (function () {
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
        return index_1.html(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n\t\t\t<div>\n\t\t\t\t<h1>Sample two way data binding</h1>\n\t\t\t\ttesting web component1 ", "\n\t\t\t\t<test-ele testprops=", "></test-ele>\n\t\t\t</div>\n\t\t"], ["\n\t\t\t<div>\n\t\t\t\t<h1>Sample two way data binding</h1>\n\t\t\t\ttesting web component1 ", "\n\t\t\t\t<test-ele testprops=", "></test-ele>\n\t\t\t</div>\n\t\t"])), this.test, this.props);
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
var AppRoot = (function () {
    function AppRoot(router) {
        var _this = this;
        this.router = router;
        this.routes = [
            {
                path: '',
                redirectTo: '/home'
            },
            {
                path: '/home',
                template: "<sample-ele></sample-ele>"
            },
            {
                path: '/persons/:id',
                template: "<persons-list></persons-list>"
            }
        ];
        this.navigate = function (path) {
            _this.router.navigateTo(path);
        };
    }
    AppRoot.prototype.getRef = function () {
        console.log(this.inputField);
    };
    AppRoot.prototype.render = function () {
        var _this = this;
        this.inputField = index_1.useRef(null);
        return index_1.html(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n     <div>\n      <ul>\n      <li>\n          <a onclick=", ">Home</a>\n        </li>\n        <li>\n          <a onclick=", ">persons</a>\n        </li>\n      </ul>\n\t\t\t<router-outlet routes=", "></router-outlet>\n\t\t\t<input type='text' ref=", " /><button onclick=", ">click</button>\n    </div>\n    "], ["\n     <div>\n      <ul>\n      <li>\n          <a onclick=", ">Home</a>\n        </li>\n        <li>\n          <a onclick=", ">persons</a>\n        </li>\n      </ul>\n\t\t\t<router-outlet routes=", "></router-outlet>\n\t\t\t<input type='text' ref=", " /><button onclick=", ">click</button>\n    </div>\n    "])), function () { _this.navigate('/home'); }, function () { _this.navigate('/persons/123'); }, this.routes, this.inputField, function () { _this.getRef(); });
    };
    AppRoot = tslib_1.__decorate([
        index_1.Component({
            selector: 'app-root'
        }),
        tslib_1.__metadata("design:paramtypes", [index_1.Router])
    ], AppRoot);
    return AppRoot;
}());
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map