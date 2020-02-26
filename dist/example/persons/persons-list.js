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
            this.update();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sa0JBQWtCLENBQUM7QUFNMUIsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUtoQixZQUFvQixVQUF5QixFQUFVLE1BQWE7UUFBaEQsZUFBVSxHQUFWLFVBQVUsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQU87UUFKcEUsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFJdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELEtBQUs7UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBUztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTTtRQUNMLE9BQU8sSUFBSSxDQUFBOztvQkFFUSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRTs7O09BR3RDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNkLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FDYixJQUFJLENBQUE7O21CQUVRLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQzs7V0FFQyxJQUFJLENBQUMsSUFBSTs7UUFFWixDQUNGOzs7O21CQUlhLElBQUksQ0FBQyxhQUFhOzs7R0FHbEMsQ0FBQztJQUNILENBQUM7Q0FDRCxDQUFBO0FBOUNLLFdBQVc7SUFKaEIsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFLG1CQUFtQjtLQUM3QixDQUFDO3FDQU0rQixhQUFhLEVBQWlCLE1BQU07R0FML0QsV0FBVyxDQThDaEI7QUFFRCxlQUFlLFdBQVcsQ0FBQyJ9