import { __decorate, __metadata } from "tslib";
import { Component, html, Router } from "../../index";
import PersonService from './persons-service';
import './person-details';
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
            this.update(); // triggers change detection and update view
        });
    }
    alertName(user) {
        this.persondetails = user;
        this.update();
    }
    render() {
        return html `
		<h4>Sample service injection with http call and passing data to other component</h4>
		<div innerHTML='${'10300'.translate('fr')}'></div>		
			<div>
				<div class="list is-hoverable">
					${this.data.map((user) => html `
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
PersonsList = __decorate([
    Component({
        selector: "persons-list",
        styleUrl: 'persons-list.scss'
    }),
    __metadata("design:paramtypes", [PersonService, Router])
], PersonsList);
export default PersonsList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sa0JBQWtCLENBQUM7QUFNMUIsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUtoQixZQUFvQixVQUF5QixFQUFVLE1BQWE7UUFBaEQsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQU87UUFKcEUsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFJdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELEtBQUs7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU07UUFDTCxPQUFPLElBQUksQ0FBQTs7b0JBRVEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUU7OztPQUd0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDZCxDQUFDLElBQVMsRUFBRSxFQUFFLENBQ2IsSUFBSSxDQUFBOzttQkFFUSxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7O1dBRUMsSUFBSSxDQUFDLElBQUk7O1FBRVosQ0FDRjs7OzttQkFJYSxJQUFJLENBQUMsYUFBYTs7O0dBR2xDLENBQUM7SUFDSCxDQUFDO0NBQ0QsQ0FBQTtBQTlDSyxXQUFXO0lBSmhCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7S0FDN0IsQ0FBQztxQ0FNK0IsYUFBYSxFQUFpQixNQUFNO0dBTC9ELFdBQVcsQ0E4Q2hCO0FBRUQsZUFBZSxXQUFXLENBQUMifQ==