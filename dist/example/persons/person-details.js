"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../index");
var PersonDetails = /** @class */ (function () {
    function PersonDetails() {
        this.userDetails = {};
    }
    PersonDetails.prototype.render = function () {
        console.log("selected: user", this.userDetails);
        if (this.userDetails.name) {
            return index_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t\t\t<div>Name: ", "</div>\n\t\t\t\t<div>Company: ", "</div>\t\t\t\t\t\t\n\t\t\t\t<form>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"exampleInputEmail1\">Email address</label>\n\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\n\t\t\t\t\t\t<small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"exampleInputPassword1\">Password</label>\n\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group form-check\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"exampleCheck1\">Check me out</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n\t\t\t\t</form>\n\t\t\t"], ["\n\t\t\t\t<div>Name: ", "</div>\n\t\t\t\t<div>Company: ", "</div>\t\t\t\t\t\t\n\t\t\t\t<form>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"exampleInputEmail1\">Email address</label>\n\t\t\t\t\t\t<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\">\n\t\t\t\t\t\t<small id=\"emailHelp\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"exampleInputPassword1\">Password</label>\n\t\t\t\t\t\t<input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group form-check\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"form-check-input\" id=\"exampleCheck1\">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"exampleCheck1\">Check me out</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n\t\t\t\t</form>\n\t\t\t"])), this.userDetails.name, this.userDetails.company.name);
        }
        else {
            return index_1.html(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
        }
    };
    tslib_1.__decorate([
        index_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], PersonDetails.prototype, "userDetails", void 0);
    PersonDetails = tslib_1.__decorate([
        index_1.Component({
            selector: "person-details"
        })
    ], PersonDetails);
    return PersonDetails;
}());
exports.default = PersonDetails;
var templateObject_1, templateObject_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWRldGFpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9leGFtcGxlL3BlcnNvbnMvcGVyc29uLWRldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFEO0FBS3JEO0lBQUE7UUFFQyxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQTZCdkIsQ0FBQztJQTNCQSw4QkFBTSxHQUFOO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLFlBQUksMm5DQUFBLHVCQUNHLEVBQXFCLGdDQUNsQixFQUE2QixxL0JBaUI3QyxLQWxCYSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQWlCNUM7U0FDRjthQUFNO1lBQ04sT0FBTyxZQUFJLDZFQUFBLEVBQUUsS0FBQztTQUNkO0lBQ0YsQ0FBQztJQTVCRDtRQURDLGFBQUssRUFBRTs7c0RBQ2M7SUFGRixhQUFhO1FBSGpDLGlCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUM7T0FDbUIsYUFBYSxDQStCakM7SUFBRCxvQkFBQztDQUFBLEFBL0JELElBK0JDO2tCQS9Cb0IsYUFBYSJ9