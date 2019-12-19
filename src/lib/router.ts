import { Component, Input } from "./decorators";
import { html } from "lighterhtml";
import { InternalRouter } from "./routerService";
import { Route } from "./types";

const registerRouterComponent = () => {
	@Component({
		selector: "router-outlet"
	})
	class RouterOutlet {
		template = "";
		update: Function;

		@Input()
		routes: Array<Route> = [];

		isRoutesAdded = false;

		constructor(private router: InternalRouter) {}

		beforeMount() {
			this.router.$templateSubscriber.subscribe((tmpl: string) => {
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

		unmount(){
			this.router.$templateSubscriber.unsubscribe();
		}

		render() {
			if (this.routes.length > 0 && !this.isRoutesAdded) {
				this.router.addRoutes(this.routes);
				this.isRoutesAdded = true;
				let path = window.location.pathname;
				this.router.navigateTo(path !== "/" ? path : "");
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
};

export { registerRouterComponent };
