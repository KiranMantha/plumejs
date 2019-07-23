"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("./decorators");
var lighterhtml_plus_1 = require("lighterhtml-plus");
var routerService_1 = require("./routerService");
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
            return lighterhtml_plus_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t<div></div>\n\t\t\t"], ["\n\t\t\t\t<div></div>\n\t\t\t"])));
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
var templateObject_1;
//# sourceMappingURL=router.js.map