"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_observer_1 = __importDefault(require("./mutation-observer"));
const decorators_1 = require("../src/lib/decorators");
class TestBed {
    static createComponent(options) {
        let appRoot;
        decorators_1.MockComponent({
            selector: options.selector
        }, options.target);
        appRoot = document.createElement(options.selector);
        document.body.appendChild(appRoot);
        mutation_observer_1.default.ready(options.selector, (ele) => {
            appRoot = ele;
        });
        return appRoot;
    }
}
exports.default = TestBed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFDO0FBQ3JDLHNEQUFzRDtBQUV0RCxNQUFxQixPQUFPO0lBQzFCLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBMkM7UUFDaEUsSUFBSSxPQUFXLENBQUM7UUFDaEIsMEJBQWEsQ0FBQztZQUNaLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtTQUMzQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsMkJBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQU8sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFiRCwwQkFhQyJ9