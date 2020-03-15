import { __decorate, __metadata } from "tslib";
import { Component } from "./decorators";
import { html } from "lighterhtml";
import { InternalRouter } from "./routerService";
const registerRouterComponent = () => {
    let RouterOutlet = class RouterOutlet {
        constructor(router) {
            this.router = router;
            this.template = "";
            this.isRoutesAdded = false;
        }
        beforeMount() {
            this.router.$templateSubscriber.subscribe((tmpl) => {
                this.template = tmpl;
                this.update();
            });
        }
        mount() {
            let self = this;
            window.onpopstate = function () {
                self.router.navigateTo(window.location.pathname);
            };
            let path = window.location.pathname;
            this.router.navigateTo(path !== "/" ? path : "");
        }
        unmount() {
            this.router.$templateSubscriber.unsubscribe();
        }
        render() {
            if (!this.template) {
                return html `
					<div></div>
				`;
            }
            else {
                const stringArray = [`${this.template}`];
                stringArray.raw = [`${this.template}`];
                return html(stringArray);
            }
        }
    };
    RouterOutlet = __decorate([
        Component({
            selector: "router-outlet"
        }),
        __metadata("design:paramtypes", [InternalRouter])
    ], RouterOutlet);
};
export { registerRouterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVMsTUFBTSxjQUFjLENBQUM7QUFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFJcEMsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtRQU1qQixZQUFvQixNQUFzQjtZQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUwxQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1lBR2Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdUIsQ0FBQztRQUU5QyxXQUFXO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELEtBQUs7WUFDSixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsTUFBTSxDQUFDLFVBQVUsR0FBRztnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUM7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxPQUFPO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQTs7S0FFVixDQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBUSxDQUFDO2dCQUNoRCxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekI7UUFDRixDQUFDO0tBQ0QsQ0FBQTtJQXZDSyxZQUFZO1FBSGpCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxlQUFlO1NBQ3pCLENBQUM7eUNBTzJCLGNBQWM7T0FOckMsWUFBWSxDQXVDakI7QUFDRixDQUFDLENBQUM7QUFFRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyJ9