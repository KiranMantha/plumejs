"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../index");
var persons_service_1 = tslib_1.__importDefault(require("./persons-service"));
require("./person-details");
var PersonsList = /** @class */ (function () {
    function PersonsList(personSrvc, router) {
        this.personSrvc = personSrvc;
        this.router = router;
        this.data = [];
        this.persondetails = {};
        console.log('current route ', this.router.getCurrentRoute());
    }
    PersonsList.prototype.mount = function () {
        var _this = this;
        this.personSrvc.getPersons().then(function (data) {
            _this.data = data;
            _this.update(); // triggers change detection and update view
        });
    };
    PersonsList.prototype.alertName = function (user) {
        this.persondetails = user;
        this.update();
    };
    PersonsList.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n\t\t<h4>Sample service injection with http call and passing data to other component</h4>\n\t\t<div innerHTML='", "'></div>\t\t\n\t\t\t<div>\n\t\t\t\t<div class=\"list is-hoverable\">\n\t\t\t\t\t", "\n\t\t\t\t</div>\n\t\t\t\t<person-details\n\t\t\t\t\tid=\"person-details\"\n\t\t\t\t\tuserDetails=", "\n\t\t\t\t></person-details>\n\t\t\t</div>\n\t\t"], ["\n\t\t<h4>Sample service injection with http call and passing data to other component</h4>\n\t\t<div innerHTML='", "'></div>\t\t\n\t\t\t<div>\n\t\t\t\t<div class=\"list is-hoverable\">\n\t\t\t\t\t",
            "\n\t\t\t\t</div>\n\t\t\t\t<person-details\n\t\t\t\t\tid=\"person-details\"\n\t\t\t\t\tuserDetails=", "\n\t\t\t\t></person-details>\n\t\t\t</div>\n\t\t"])), '10300'.translate('fr'), this.data.map(function (user) {
            return index_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t\t\t\t\t<a class=\"list-item\"\n\t\t\t\t\t\t\t\t\tonclick=", "\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</>\n\t\t\t\t\t\t\t"], ["\n\t\t\t\t\t\t\t\t<a class=\"list-item\"\n\t\t\t\t\t\t\t\t\tonclick=",
                "\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t", "\n\t\t\t\t\t\t\t\t</>\n\t\t\t\t\t\t\t"])), function () {
                _this.alertName(user);
            }, user.name);
        }), this.persondetails);
    };
    PersonsList = tslib_1.__decorate([
        index_1.Component({
            selector: "persons-list",
            styleUrl: 'persons-list.scss'
        }),
        tslib_1.__metadata("design:paramtypes", [persons_service_1.default, index_1.Router])
    ], PersonsList);
    return PersonsList;
}());
exports.default = PersonsList;
var templateObject_1, templateObject_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBc0Q7QUFDdEQsOEVBQThDO0FBQzlDLDRCQUEwQjtBQU0xQjtJQUtDLHFCQUFvQixVQUF5QixFQUFVLE1BQWE7UUFBaEQsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQU87UUFKcEUsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFJdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELDJCQUFLLEdBQUw7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNyQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLElBQVM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELDRCQUFNLEdBQU47UUFBQSxpQkF5QkM7UUF4QkEsT0FBTyxZQUFJLDJhQUFBLGtIQUVPLEVBQXlCLGtGQUd0QztZQVdELG9HQUlhLEVBQWtCLGtEQUdsQyxLQXJCa0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFHckMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2QsVUFBQyxJQUFTO1lBQ1QsT0FBQSxZQUFJLHFPQUFBLHNFQUVRO2dCQUVULHlDQUVDLEVBQVMsdUNBRVosS0FOVztnQkFDVCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUMsRUFFQyxJQUFJLENBQUMsSUFBSTtRQU5iLENBUUMsQ0FDRixFQUlhLElBQUksQ0FBQyxhQUFhLEVBR2pDO0lBQ0gsQ0FBQztJQTdDSSxXQUFXO1FBSmhCLGlCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsbUJBQW1CO1NBQzdCLENBQUM7aURBTStCLHlCQUFhLEVBQWlCLGNBQU07T0FML0QsV0FBVyxDQThDaEI7SUFBRCxrQkFBQztDQUFBLEFBOUNELElBOENDO0FBRUQsa0JBQWUsV0FBVyxDQUFDIn0=