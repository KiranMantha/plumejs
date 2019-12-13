"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../src/lib/decorators");
const service_resolver_1 = require("../src/lib/service_resolver");
class TestBed {
    static MockComponent(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let appRoot;
            decorators_1.MockComponent({
                selector: options.selector
            }, options.target);
            appRoot = yield _waitForComponentToRender(options.selector);
            return appRoot;
        });
    }
    static MockService(name, target) {
        service_resolver_1.Injector.register(name, target);
        return service_resolver_1.Injector.get(name);
    }
    static RemoveComponent(node) {
        document.removeChild(node);
    }
}
exports.default = TestBed;
function _waitForComponentToRender(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        let ele = document.createElement(tag);
        document.body.appendChild(ele);
        return new Promise(resolve => {
            function requestComponent() {
                const element = document.querySelector(tag);
                if (element) {
                    resolve(element);
                }
                else {
                    window.requestAnimationFrame(requestComponent);
                }
            }
            requestComponent();
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXNEO0FBQ3RELGtFQUF1RDtBQUV2RCxNQUFxQixPQUFPO0lBQzFCLE1BQU0sQ0FBTyxhQUFhLENBQUMsT0FBMkM7O1lBQ3BFLElBQUksT0FBVyxDQUFDO1lBQ2hCLDBCQUFhLENBQUM7Z0JBQ1osUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2FBQzNCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxNQUFNLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQVcsRUFBRSxNQUFVO1FBQ3hDLDJCQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxPQUFPLDJCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQWlCO1FBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBbEJELDBCQWtCQztBQUVELFNBQWUseUJBQXlCLENBQUMsR0FBVTs7UUFDakQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLFNBQVMsZ0JBQWdCO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUNoRDtZQUNILENBQUM7WUFDRCxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUFBIn0=