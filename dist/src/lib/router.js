import * as tslib_1 from "tslib";
import { Component, Input } from "./decorators";
import { html } from "lighterhtml-plus";
import { InternalRouter } from "./routerService";
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
            return html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t<div></div>\n\t\t\t"], ["\n\t\t\t\t<div></div>\n\t\t\t"])));
        }
        else {
            var stringArray = ["" + this.template];
            stringArray.raw = ["" + this.template];
            return html(stringArray);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], RouterOutlet.prototype, "routes", void 0);
    RouterOutlet = tslib_1.__decorate([
        Component({
            selector: "router-outlet"
        }),
        tslib_1.__metadata("design:paramtypes", [InternalRouter])
    ], RouterOutlet);
    return RouterOutlet;
}());
var templateObject_1;
//# sourceMappingURL=router.js.map