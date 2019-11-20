"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var lighterhtml_plus_1 = require("lighterhtml-plus");
var routerService_1 = require("./routerService");
var registerRouterComponent = function () {
    var RouterOutlet = (function () {
        function RouterOutlet(router) {
            this.router = router;
            this.template = "";
            this.routes = [];
            this.isRoutesAdded = false;
        }
        RouterOutlet.prototype.beforeMount = function () {
            var _this = this;
            this.router.setOutletFn(function (tmpl) {
                _this.template = tmpl;
                _this.update();
            });
        };
        RouterOutlet.prototype.mount = function () {
            var self = this;
            window.onpopstate = function () {
                self.router.navigateTo(window.location.pathname);
            };
        };
        RouterOutlet.prototype.render = function () {
            if (this.routes.length > 0 && !this.isRoutesAdded) {
                this.router.addRoutes(this.routes);
                this.isRoutesAdded = true;
            }
            if (!this.template) {
                return lighterhtml_plus_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\t<div></div>\n\t\t\t\t"], ["\n\t\t\t\t\t<div></div>\n\t\t\t\t"])));
            }
            else {
                var stringArray = ["" + this.template];
                stringArray.raw = ["" + this.template];
                return lighterhtml_plus_1.html(stringArray);
            }
        };
        tslib_1.__decorate([
            decorators_1.Input(),
            tslib_1.__metadata("design:type", Array)
        ], RouterOutlet.prototype, "routes", void 0);
        RouterOutlet = tslib_1.__decorate([
            decorators_1.Component({
                selector: "router-outlet"
            }),
            tslib_1.__metadata("design:paramtypes", [routerService_1.InternalRouter])
        ], RouterOutlet);
        return RouterOutlet;
    }());
};
exports.default = registerRouterComponent;
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQWdEO0FBQ2hELHFEQUF3QztBQUN4QyxpREFBaUQ7QUFHakQsSUFBTSx1QkFBdUIsR0FBRztJQUkvQjtRQVNDLHNCQUFvQixNQUFzQjtZQUF0QixXQUFNLEdBQU4sTUFBTSxDQUFnQjtZQVIxQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1lBSWQsV0FBTSxHQUFpQixFQUFFLENBQUM7WUFFMUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdUIsQ0FBQztRQUU5QyxrQ0FBVyxHQUFYO1lBQUEsaUJBS0M7WUFKQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFDLElBQVk7Z0JBQ3BDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCw0QkFBSyxHQUFMO1lBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLEdBQUc7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDO1FBQ0gsQ0FBQztRQUVELDZCQUFNLEdBQU47WUFDQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDMUI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsT0FBTyx1QkFBSSw4R0FBQSxtQ0FFVixLQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sSUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFVLENBQVEsQ0FBQztnQkFDaEQsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLHVCQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekI7UUFDRixDQUFDO1FBbENEO1lBREMsa0JBQUssRUFBRTs4Q0FDQSxLQUFLO29EQUFhO1FBTHJCLFlBQVk7WUFIakIsc0JBQVMsQ0FBQztnQkFDVixRQUFRLEVBQUUsZUFBZTthQUN6QixDQUFDO3FEQVUyQiw4QkFBYztXQVRyQyxZQUFZLENBd0NqQjtRQUFELG1CQUFDO0tBQUEsQUF4Q0QsSUF3Q0M7QUFDRixDQUFDLENBQUM7QUFFRixrQkFBZSx1QkFBdUIsQ0FBQyJ9