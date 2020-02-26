import { Component, html, Router } from "../../index";
import PersonService from './persons-service';
import './person-details';

@Component({
	selector: "persons-list",
	styleUrl: 'persons-list.scss'
})
class PersonsList {
	data: Array<string> = [];
	persondetails: any = {};
	update: any;
	element: any;
	constructor(private personSrvc: PersonService, private router:Router) {
		console.log('current route ', this.router.getCurrentRoute());
	}
	mount() {
		this.personSrvc.getPersons().then(data => {
			this.data = data;
			this.update(); // triggers change detection and update view
		});
	}

	alertName(user: any) {
		this.persondetails = user;
		this.update();
	}

	render() {
		return html`
		<h4>Sample service injection with http call and passing data to other component</h4>
		<div innerHTML='${ '10300'.translate('fr') }'></div>		
			<div>
				<div class="list is-hoverable">
					${this.data.map(
						(user: any) =>
							html`
								<a class="list-item"
									onclick=${() => {
										this.alertName(user);
									}}
								>
									${user.name}
								</>
							`
					)}
				</div>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`;
	}
}

export default PersonsList;
