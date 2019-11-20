"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mutation_observer_1 = tslib_1.__importDefault(require("./mutation-observer"));
var decorators_1 = require("../src/lib/decorators");
var TestBed = (function () {
    function TestBed() {
    }
    TestBed.createComponent = function (options) {
        var appRoot;
        decorators_1.MockComponent({
            selector: options.selector
        }, options.target);
        appRoot = document.createElement(options.selector);
        document.body.appendChild(appRoot);
        mutation_observer_1.default.ready(options.selector, function (ele) {
            appRoot = ele;
        });
        return appRoot;
    };
    return TestBed;
}());
exports.default = TestBed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtGQUFxQztBQUNyQyxvREFBc0Q7QUFFdEQ7SUFBQTtJQWFBLENBQUM7SUFaUSx1QkFBZSxHQUF0QixVQUF1QixPQUEyQztRQUNoRSxJQUFJLE9BQVcsQ0FBQztRQUNoQiwwQkFBYSxDQUFDO1lBQ1osUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQywyQkFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsR0FBTztZQUNqQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQyJ9