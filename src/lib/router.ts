import { Component, Input } from "./decorators";
import { html } from "lighterhtml-plus";
import { InternalRouter } from "./routerService";

@Component({
	selector: "router-outlet"
})
class RouterOutlet {
	template = "";
  update: any;
  
	@Input()
	routes: Array<Route> = [];

	isRoutesAdded = false;

	constructor(private router: InternalRouter) {}

	beforeMount() {
		this.router.setOutletFn((tmpl: string) => {
			this.template = tmpl;
			this.update();
		});
	}

	mount() {
		let self = this;
		window.onpopstate = function() {
			self.router.navigateTo(window.location.pathname);
		};
	}

	render() {
		if (this.routes.length > 0 && !this.isRoutesAdded) {
			this.router.addRoutes(this.routes);
			this.isRoutesAdded = true;
		}
		if (!this.template) {
			return html`
				<div></div>
			`;
		} else {
			const stringArray = [`${this.template}`] as any;
			stringArray.raw = [`${this.template}`];
			return html(stringArray);
		}
	}
}


