import { __decorate, __metadata } from "tslib";
import { Component, Input } from "./decorators";
import { html } from "lighterhtml";
import { InternalRouter } from "./routerService";
const registerRouterComponent = () => {
    let RouterOutlet = class RouterOutlet {
        constructor(router) {
            this.router = router;
            this.template = "";
            this.routes = [];
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
        }
        unmount() {
            this.router.$templateSubscriber.unsubscribe();
        }
        render() {
            if (this.routes.length > 0 && !this.isRoutesAdded) {
                this.router.addRoutes(this.routes);
                this.isRoutesAdded = true;
                let path = window.location.pathname;
                this.router.navigateTo(path !== "/" ? path : "");
            }
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
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], RouterOutlet.prototype, "routes", void 0);
    RouterOutlet = __decorate([
        Component({
            selector: "router-outlet"
        }),
        __metadata("design:paramtypes", [InternalRouter])
    ], RouterOutlet);
};
export { registerRouterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2pELE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBSXBDLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7UUFTakIsWUFBb0IsTUFBc0I7WUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7WUFSMUMsYUFBUSxHQUFHLEVBQUUsQ0FBQztZQUlkLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1lBRTFCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXVCLENBQUM7UUFFOUMsV0FBVztZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxLQUFLO1lBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLEdBQUc7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU87WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFFRCxNQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQTs7S0FFVixDQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBUSxDQUFDO2dCQUNoRCxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekI7UUFDRixDQUFDO0tBQ0QsQ0FBQTtJQXpDQTtRQURDLEtBQUssRUFBRTtrQ0FDQSxLQUFLO2dEQUFhO0lBTHJCLFlBQVk7UUFIakIsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGVBQWU7U0FDekIsQ0FBQzt5Q0FVMkIsY0FBYztPQVRyQyxZQUFZLENBOENqQjtBQUNGLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDIn0=