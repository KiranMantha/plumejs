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
			let path = window.location.pathname;
			this.router.navigateTo(path !== "/" ? path : "");
		}

		unmount(){
			this.router.$templateSubscriber.unsubscribe();
		}

		render() {
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
