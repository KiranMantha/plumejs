"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var lighterhtml_1 = require("lighterhtml");
var routerService_1 = require("./routerService");
var registerRouterComponent = function () {
    var RouterOutlet = /** @class */ (function () {
        function RouterOutlet(router) {
            this.router = router;
            this.template = "";
            this.isRoutesAdded = false;
        }
        RouterOutlet.prototype.beforeMount = function () {
            var _this = this;
            this.router.$templateSubscriber.subscribe(function (tmpl) {
                _this.template = tmpl;
                _this.update();
            });
        };
        RouterOutlet.prototype.mount = function () {
            var self = this;
            window.onpopstate = function () {
                self.router.navigateTo(window.location.pathname);
            };
            var path = window.location.pathname;
            this.router.navigateTo(path !== "/" ? path : "");
        };
        RouterOutlet.prototype.unmount = function () {
            this.router.$templateSubscriber.unsubscribe();
        };
        RouterOutlet.prototype.render = function () {
            if (!this.template) {
                return lighterhtml_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\t<div></div>\n\t\t\t\t"], ["\n\t\t\t\t\t<div></div>\n\t\t\t\t"])));
            }
            else {
                var stringArray = ["" + this.template];
                stringArray.raw = ["" + this.template];
                return lighterhtml_1.html(stringArray);
            }
        };
        RouterOutlet = tslib_1.__decorate([
            decorators_1.Component({
                selector: "router-outlet"
            }),
            tslib_1.__metadata("design:paramtypes", [routerService_1.InternalRouter])
        ], RouterOutlet);
        return RouterOutlet;
    }());
};
exports.registerRouterComponent = registerRouterComponent;
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQWdEO0FBQ2hELDJDQUFtQztBQUNuQyxpREFBaUQ7QUFHakQsSUFBTSx1QkFBdUIsR0FBRztJQUkvQjtRQU1DLHNCQUFvQixNQUFzQjtZQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQUwxQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1lBR2Qsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdUIsQ0FBQztRQUU5QyxrQ0FBVyxHQUFYO1lBQUEsaUJBS0M7WUFKQSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVk7Z0JBQ3RELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCw0QkFBSyxHQUFMO1lBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLEdBQUc7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDO1lBQ0YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQsOEJBQU8sR0FBUDtZQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUVELDZCQUFNLEdBQU47WUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsT0FBTyxrQkFBSSw4R0FBQSxtQ0FFVixLQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sSUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFVLENBQVEsQ0FBQztnQkFDaEQsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLGtCQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekI7UUFDRixDQUFDO1FBdENJLFlBQVk7WUFIakIsc0JBQVMsQ0FBQztnQkFDVixRQUFRLEVBQUUsZUFBZTthQUN6QixDQUFDO3FEQU8yQiw4QkFBYztXQU5yQyxZQUFZLENBdUNqQjtRQUFELG1CQUFDO0tBQUEsQUF2Q0QsSUF1Q0M7QUFDRixDQUFDLENBQUM7QUFFTywwREFBdUIifQ==