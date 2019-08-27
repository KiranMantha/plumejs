"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const decorators_1 = require("./decorators");
const lighterhtml_plus_1 = require("lighterhtml-plus");
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
                return lighterhtml_plus_1.html `
					<div></div>
				`;
            }
            else {
                const stringArray = [`${this.template}`];
                stringArray.raw = [`${this.template}`];
                return lighterhtml_plus_1.html(stringArray);
            }
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
};
exports.default = registerRouterComponent;
//# sourceMappingURL=router.js.map