"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
let PersonDetails = class PersonDetails {
    constructor() {
        this.userDetails = {};
    }
    render() {
        console.log("selected: user", this.userDetails);
        if (this.userDetails.name) {
            return index_1.html `
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>						
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
						<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Password</label>
						<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
					</div>
					<div class="form-group form-check">
						<input type="checkbox" class="form-check-input" id="exampleCheck1">
						<label class="form-check-label" for="exampleCheck1">Check me out</label>
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			`;
        }
        else {
            return index_1.html ``;
        }
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
exports.default = PersonDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWRldGFpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9leGFtcGxlL3BlcnNvbnMvcGVyc29uLWRldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXFEO0FBS3JELElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYTtJQUFsQztRQUVDLGdCQUFXLEdBQVEsRUFBRSxDQUFDO0lBNkJ2QixDQUFDO0lBM0JBLE1BQU07UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sWUFBSSxDQUFBO2lCQUNHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQjdDLENBQUM7U0FDRjthQUFNO1lBQ04sT0FBTyxZQUFJLENBQUEsRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTdCQTtJQURDLGFBQUssRUFBRTs7a0RBQ2M7QUFGRixhQUFhO0lBSGpDLGlCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsZ0JBQWdCO0tBQzFCLENBQUM7R0FDbUIsYUFBYSxDQStCakM7a0JBL0JvQixhQUFhIn0=