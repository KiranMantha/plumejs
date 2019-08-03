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
const lighterhtml_plus_1 = require("lighterhtml-plus");
const routerService_1 = require("./routerService");
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
//# sourceMappingURL=router.js.map