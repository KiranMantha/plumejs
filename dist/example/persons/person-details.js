import { __decorate, __metadata } from "tslib";
import { Component, Input, html } from "../../index";
let PersonDetails = class PersonDetails {
    constructor() {
        this.userDetails = {};
    }
    render() {
        console.log("selected: user", this.userDetails);
        if (this.userDetails.name) {
            return html `
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
            return html ``;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PersonDetails.prototype, "userDetails", void 0);
PersonDetails = __decorate([
    Component({
        selector: "person-details"
    })
], PersonDetails);
export default PersonDetails;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWRldGFpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9leGFtcGxlL3BlcnNvbnMvcGVyc29uLWRldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUtyRCxJQUFxQixhQUFhLEdBQWxDLE1BQXFCLGFBQWE7SUFBbEM7UUFFQyxnQkFBVyxHQUFRLEVBQUUsQ0FBQztJQTZCdkIsQ0FBQztJQTNCQSxNQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQTtpQkFDRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUI3QyxDQUFDO1NBQ0Y7YUFBTTtZQUNOLE9BQU8sSUFBSSxDQUFBLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztDQUNELENBQUE7QUE3QkE7SUFEQyxLQUFLLEVBQUU7O2tEQUNjO0FBRkYsYUFBYTtJQUhqQyxTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsZ0JBQWdCO0tBQzFCLENBQUM7R0FDbUIsYUFBYSxDQStCakM7ZUEvQm9CLGFBQWEifQ==