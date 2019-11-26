"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const lighterhtml_1 = require("lighterhtml");
const routerService_1 = require("./routerService");
const registerRouterComponent = () => {
    let RouterOutlet = class RouterOutlet {
        constructor(router) {
            this.router = router;
            this.template = "";
            this.routes = [];
            this.isRoutesAdded = false;
        }
        beforeMount() {
            this.router.setOutletFn((tmpl) => {
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
        render() {
            if (this.routes.length > 0 && !this.isRoutesAdded) {
                this.router.addRoutes(this.routes);
                this.isRoutesAdded = true;
            }
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
    __decorate([
        decorators_1.Input(),
        __metadata("design:type", Array)
    ], RouterOutlet.prototype, "routes", void 0);
    RouterOutlet = __decorate([
        decorators_1.Component({
            selector: "router-outlet"
        }),
        __metadata("design:paramtypes", [routerService_1.InternalRouter])
    ], RouterOutlet);
};
exports.default = registerRouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBZ0Q7QUFDaEQsNkNBQW1DO0FBQ25DLG1EQUFpRDtBQUdqRCxNQUFNLHVCQUF1QixHQUFHLEdBQUcsRUFBRTtJQUlwQyxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFZO1FBU2pCLFlBQW9CLE1BQXNCO1lBQXRCLFdBQU0sR0FBTixNQUFNLENBQWdCO1lBUjFDLGFBQVEsR0FBRyxFQUFFLENBQUM7WUFJZCxXQUFNLEdBQWlCLEVBQUUsQ0FBQztZQUUxQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV1QixDQUFDO1FBRTlDLFdBQVc7WUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsS0FBSztZQUNKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixNQUFNLENBQUMsVUFBVSxHQUFHO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLE9BQU8sa0JBQUksQ0FBQTs7S0FFVixDQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBUSxDQUFDO2dCQUNoRCxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxrQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0YsQ0FBQztLQUNELENBQUE7SUFuQ0E7UUFEQyxrQkFBSyxFQUFFO2tDQUNBLEtBQUs7Z0RBQWE7SUFMckIsWUFBWTtRQUhqQixzQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGVBQWU7U0FDekIsQ0FBQzt5Q0FVMkIsOEJBQWM7T0FUckMsWUFBWSxDQXdDakI7QUFDRixDQUFDLENBQUM7QUFFRixrQkFBZSx1QkFBdUIsQ0FBQyJ9