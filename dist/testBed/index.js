"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const service_resolver_1 = require("../src/lib/service_resolver");
class TestBed {
    static MockComponent(target) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let appRoot = yield _waitForComponentToRender(target.prototype.selector);
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
exports.TestBed = TestBed;
function _waitForComponentToRender(tag) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUF1RDtBQUV2RCxNQUFhLE9BQU87SUFDbEIsTUFBTSxDQUFPLGFBQWEsQ0FBQyxNQUFlOztZQUN4QyxJQUFJLE9BQU8sR0FBRyxNQUFNLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekUsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFXLEVBQUUsTUFBVTtRQUN4QywyQkFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsT0FBTywyQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFpQjtRQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQWRELDBCQWNDO0FBRUQsU0FBZSx5QkFBeUIsQ0FBQyxHQUFVOztRQUNqRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsU0FBUyxnQkFBZ0I7Z0JBQ3ZCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ2hEO1lBQ0gsQ0FBQztZQUNELGdCQUFnQixFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEifQ==