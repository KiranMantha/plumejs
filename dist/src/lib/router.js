"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
            return lighterhtml_plus_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t\t\t<div></div>\n\t\t\t"], ["\n\t\t\t\t<div></div>\n\t\t\t"])));
        }
        else {
            var stringArray = ["" + this.template];
            stringArray.raw = ["" + this.template];
            return lighterhtml_plus_1.html(stringArray);
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
    return RouterOutlet;
}());
var templateObject_1;
//# sourceMappingURL=router.js.map