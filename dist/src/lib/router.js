"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("./decorators");
const lighterhtml_1 = require("lighterhtml");
const internalRouterService_1 = require("./internalRouterService");
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
            let path = window.location.hash;
            this.router.navigateTo(path);
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
        tslib_1.__metadata("design:paramtypes", [internalRouterService_1.InternalRouter])
    ], RouterOutlet);
};
exports.registerRouterComponent = registerRouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlDO0FBQ3pDLDZDQUFtQztBQUNuQyxtRUFBeUQ7QUFFekQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFJcEMsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtRQU1qQixZQUFvQixNQUFzQjtZQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUwxQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1lBR2Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdUIsQ0FBQztRQUU5QyxXQUFXO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELEtBQUs7WUFDSixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsT0FBTztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELE1BQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsT0FBTyxrQkFBSSxDQUFBOztLQUVWLENBQUM7YUFDRjtpQkFBTTtnQkFDTixNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFRLENBQUM7Z0JBQ2hELFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLGtCQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekI7UUFDRixDQUFDO0tBQ0QsQ0FBQTtJQW5DSyxZQUFZO1FBSGpCLHNCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsZUFBZTtTQUN6QixDQUFDO2lEQU8yQixzQ0FBYztPQU5yQyxZQUFZLENBbUNqQjtBQUNGLENBQUMsQ0FBQztBQUVPLDBEQUF1QiJ9