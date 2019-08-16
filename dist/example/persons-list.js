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
const index_1 = require("../index");
let PersonService = class PersonService {
    getPersons() {
        return fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    }
};
PersonService = __decorate([
    index_1.Injectable()
], PersonService);
exports.PersonService = PersonService;
let PersonsList = class PersonsList {
    constructor(personSrvc, router) {
        this.personSrvc = personSrvc;
        this.router = router;
        this.data = [];
        this.persondetails = {};
        console.log('current route ', this.router.getCurrentRoute());
    }
    mount() {
        this.personSrvc.getPersons().then(data => {
            this.data = data;
            this.update();
        });
    }
    alertName(user) {
        this.persondetails = user;
        this.update();
    }
    render() {
        return index_1.html `
		<h4>Sample service injection with http call and passing data to other component</h4>
		<div innerHTML='${'10300'.translate('fr')}'></div>		
			<div>
				<ul class="list-group">
					${this.data.map((user) => index_1.html `
								<li class="list-group-item"
									onclick=${() => {
            this.alertName(user);
        }}
								>
									${user.name}
								</li>
							`)}
				</ul>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`;
    }
};
PersonsList = __decorate([
    index_1.Component({
        selector: "persons-list",
        styleUrl: 'persons-list.scss'
    }),
    __metadata("design:paramtypes", [PersonService, index_1.Router])
], PersonsList);
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
__decorate([
    index_1.Input(),
    __metadata("design:type", Object)
], PersonDetails.prototype, "userDetails", void 0);
PersonDetails = __decorate([
    index_1.Component({
        selector: "person-details"
    })
], PersonDetails);
exports.PersonDetails = PersonDetails;
//# sourceMappingURL=persons-list.js.map