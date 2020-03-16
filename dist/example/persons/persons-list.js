"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const persons_service_1 = tslib_1.__importDefault(require("./persons-service"));
require("./person-details");
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
				<div class="list is-hoverable">
					${this.data.map((user) => index_1.html `
								<a class="list-item"
									onclick=${() => {
            this.alertName(user);
        }}
								>
									${user.name}
								</>
							`)}
				</div>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`;
    }
};
PersonsList = tslib_1.__decorate([
    index_1.Component({
        selector: "persons-list",
        styleUrl: 'persons-list.scss'
    }),
    tslib_1.__metadata("design:paramtypes", [persons_service_1.default, index_1.Router])
], PersonsList);
exports.default = PersonsList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBc0Q7QUFDdEQsZ0ZBQThDO0FBQzlDLDRCQUEwQjtBQU0xQixJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0lBS2hCLFlBQW9CLFVBQXlCLEVBQVUsTUFBYTtRQUFoRCxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUpwRSxTQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUN6QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUl2QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsS0FBSztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFTO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNO1FBQ0wsT0FBTyxZQUFJLENBQUE7O29CQUVRLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFFOzs7T0FHdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ2QsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUNiLFlBQUksQ0FBQTs7bUJBRVEsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDOztXQUVDLElBQUksQ0FBQyxJQUFJOztRQUVaLENBQ0Y7Ozs7bUJBSWEsSUFBSSxDQUFDLGFBQWE7OztHQUdsQyxDQUFDO0lBQ0gsQ0FBQztDQUNELENBQUE7QUE5Q0ssV0FBVztJQUpoQixpQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFLG1CQUFtQjtLQUM3QixDQUFDOzZDQU0rQix5QkFBYSxFQUFpQixjQUFNO0dBTC9ELFdBQVcsQ0E4Q2hCO0FBRUQsa0JBQWUsV0FBVyxDQUFDIn0=