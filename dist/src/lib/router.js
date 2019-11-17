import { __decorate, __makeTemplateObject, __metadata } from "tslib";
import { Component, Input } from "./decorators";
import { html } from "lighterhtml-plus";
import { InternalRouter } from "./routerService";
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
                return html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\t\t\t<div></div>\n\t\t\t\t"], ["\n\t\t\t\t\t<div></div>\n\t\t\t\t"])));
            }
            else {
                var stringArray = ["" + this.template];
                stringArray.raw = ["" + this.template];
                return html(stringArray);
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
        return RouterOutlet;
    }());
};
export default registerRouterComponent;
var templateObject_1;
//# sourceMappingURL=router.js.map