import { __awaiter } from "tslib";
import { Injector } from '../src/lib/service_resolver';
export class TestBed {
    static MockComponent(target) {
        return __awaiter(this, void 0, void 0, function* () {
            let appRoot = yield _waitForComponentToRender(target.prototype.selector);
            return appRoot;
        });
    }
    static MockService(name, target) {
        Injector.register(name, target);
        return Injector.get(name);
    }
    static RemoveComponent(node) {
        document.removeChild(node);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsTUFBTSxPQUFPLE9BQU87SUFDbEIsTUFBTSxDQUFPLGFBQWEsQ0FBQyxNQUFlOztZQUN4QyxJQUFJLE9BQU8sR0FBRyxNQUFNLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekUsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFXLEVBQUUsTUFBVTtRQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBaUI7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFFRCxTQUFlLHlCQUF5QixDQUFDLEdBQVU7O1FBQ2pELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMzQixTQUFTLGdCQUFnQjtnQkFDdkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNsQjtxQkFBTTtvQkFDTCxNQUFNLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDaEQ7WUFDSCxDQUFDO1lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQSJ9