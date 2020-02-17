import { Injector } from '../src/lib/service_resolver';
export class TestBed {
    static async MockComponent(target) {
        let appRoot = await _waitForComponentToRender(target.prototype.selector);
        return appRoot;
    }
    static MockService(name, target) {
        Injector.register(name, target);
        return Injector.get(name);
    }
    static RemoveComponent(node) {
        document.removeChild(node);
    }
}
async function _waitForComponentToRender(tag) {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RCxNQUFNLE9BQU8sT0FBTztJQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFlO1FBQ3hDLElBQUksT0FBTyxHQUFHLE1BQU0seUJBQXlCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFXLEVBQUUsTUFBVTtRQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBaUI7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFFRCxLQUFLLFVBQVUseUJBQXlCLENBQUMsR0FBVTtJQUNqRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDM0IsU0FBUyxnQkFBZ0I7WUFDdkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDaEQ7UUFDSCxDQUFDO1FBQ0QsZ0JBQWdCLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==