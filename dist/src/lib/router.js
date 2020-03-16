"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("./decorators");
const lighterhtml_1 = require("lighterhtml");
const routerService_1 = require("./routerService");
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
                return lighterhtml_1.html `
					<div></div>
				`;
            }
            else {
                const stringArray = [`${this.template}`];
                stringArray.raw = [`${this.template}`];
                return lighterhtml_1.html(stringArray);
            }
        }
    };
    RouterOutlet = tslib_1.__decorate([
        decorators_1.Component({
            selector: "router-outlet"
        }),
        tslib_1.__metadata("design:paramtypes", [routerService_1.InternalRouter])
    ], RouterOutlet);
};
exports.registerRouterComponent = registerRouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBQ2hELDZDQUFtQztBQUNuQyxtREFBaUQ7QUFHakQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFJcEMsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtRQU1qQixZQUFvQixNQUFzQjtZQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUwxQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1lBR2Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdUIsQ0FBQztRQUU5QyxXQUFXO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELEtBQUs7WUFDSixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsTUFBTSxDQUFDLFVBQVUsR0FBRztnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUM7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxPQUFPO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPLGtCQUFJLENBQUE7O0tBRVYsQ0FBQzthQUNGO2lCQUFNO2dCQUNOLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQVEsQ0FBQztnQkFDaEQsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sa0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6QjtRQUNGLENBQUM7S0FDRCxDQUFBO0lBdkNLLFlBQVk7UUFIakIsc0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxlQUFlO1NBQ3pCLENBQUM7aURBTzJCLDhCQUFjO09BTnJDLFlBQVksQ0F1Q2pCO0FBQ0YsQ0FBQyxDQUFDO0FBRU8sMERBQXVCIn0=