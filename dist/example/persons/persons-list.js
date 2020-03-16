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
            this.update(); // triggers change detection and update view
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBc0Q7QUFDdEQsZ0ZBQThDO0FBQzlDLDRCQUEwQjtBQU0xQixJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0lBS2hCLFlBQW9CLFVBQXlCLEVBQVUsTUFBYTtRQUFoRCxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUpwRSxTQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUN6QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUl2QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsS0FBSztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLDRDQUE0QztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBUztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTTtRQUNMLE9BQU8sWUFBSSxDQUFBOztvQkFFUSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRTs7O09BR3RDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNkLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FDYixZQUFJLENBQUE7O21CQUVRLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQzs7V0FFQyxJQUFJLENBQUMsSUFBSTs7UUFFWixDQUNGOzs7O21CQUlhLElBQUksQ0FBQyxhQUFhOzs7R0FHbEMsQ0FBQztJQUNILENBQUM7Q0FDRCxDQUFBO0FBOUNLLFdBQVc7SUFKaEIsaUJBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7S0FDN0IsQ0FBQzs2Q0FNK0IseUJBQWEsRUFBaUIsY0FBTTtHQUwvRCxXQUFXLENBOENoQjtBQUVELGtCQUFlLFdBQVcsQ0FBQyJ9