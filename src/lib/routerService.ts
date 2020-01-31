import { isFunction, isArray } from "./utils";
import { RouteItem, Route, jsonObject } from "./types";
import { registerRouterComponent } from "./router";
import { Subject } from 'rxjs';

interface InternalRouteItem extends RouteItem {
	IsRegistered?: boolean;
	TemplatePath?: string;
	redirectTo?: string;
}

interface ICurrentRoute {
	params: { [key: string]: string | number | boolean };
}

class StaticRouter {
	static checkParams(up: Array<string>, r: RouteItem) {
		let pmc = 0,
			po: jsonObject = {},
			pc = r.ParamCount;

		for (let i = 0; i < up.length; i++) {
			var rtParam = r.Params[i];
			if (rtParam.indexOf(":") >= 0) {
				po[rtParam.split(":")[1]] = up[i];
				pmc += 1;
			}
		}
		if (pmc === pc) {
			return po;
		}
		return false;
	}

	static getParamCount(p: string[]) {
		let pc = 0;
		p.forEach((k: string) => {
			if (k.indexOf(":") >= 0) {
				pc += 1;
			}
		});
		return pc;
	}

	static formatRoute(r: Route): InternalRouteItem {
		let obj: InternalRouteItem = {
			Params: {},
			Url: "",
			Template: "",
			TemplatePath: "",
			ParamCount: 0,
			IsRegistered: false,
			redirectTo: ""
		};
		obj.Params = r.path.split("/").filter((h: string) => {
			return h.length > 0;
		});
		obj.Url = r.path;
		obj.Template = "";
		obj.redirectTo = r.redirectTo;
		if (r.template) {
			if (!r.templatePath)
				throw Error(
					"templatePath is required in route if template is mentioned."
				);
			obj.Template = r.template;
			obj.TemplatePath = r.templatePath;
		}
		obj.ParamCount = StaticRouter.getParamCount(obj.Params);
		return obj;
	}
}

export class InternalRouter {
	currentRoute: ICurrentRoute = {
		params: {}
	};
	private routeList: Array<InternalRouteItem> = [];
	private currentPage:string = null;
	private previousPage = "";
	$templateSubscriber = new Subject();

	private async _navigateTo(path: string) {
		if (this.currentPage !== path) {
			this.previousPage = this.currentPage;
			this.currentPage = path;
			let uParams = path.split("/").filter(h => {
				return h.length > 0;
			});
			let routeArr = this.routeList.filter(route => {
				if (route.Params.length === uParams.length) {
					return route;
				} else if(route.Url === path) {
					return route;
				}
			});
			let routeItem = routeArr.length > 0 ? routeArr[0] : null;
			if (routeItem) {
				let _params = StaticRouter.checkParams(uParams, routeItem);
				if (
					_params &&
					(Object.keys(_params).length > 0 || path)
				) {
					this.currentRoute.params = _params;
					if (!routeItem.IsRegistered) {
						if (routeItem.TemplatePath) {
							await import(`src/${routeItem.TemplatePath}`)
							window.history.pushState(null, "", path);
							this.$templateSubscriber.next(routeItem.Template);
						}
						routeItem.IsRegistered = true;
					} else {
						window.history.pushState(null, "", path);
						this.$templateSubscriber.next(routeItem.Template);
					}
				} else {
					this._navigateTo(routeItem.redirectTo);
				}
			}
		}
	}

	addRoutes(routes: Array<Route>) {
		if (isArray(routes)) {
			for (let route of routes) {
				this.routeList.push(StaticRouter.formatRoute(route));
			}
		} else {
			throw Error("router.addRoutes: the parameter must be an array");
		}
	}

	getCurrentRoute(): ICurrentRoute {
		return this.currentRoute;
	}

	navigateTo(path: string = "") {		
		this._navigateTo(path);
	}

	onNavigationStart(cb: any) {
		if (cb && isFunction(cb)) {
			window.addEventListener("hashchange", cb, false);
		}
	}
}

export class Router {
	getCurrentRoute: () => ICurrentRoute;
	navigateTo: (path: string) => void;
	onNavigationStart: () => void;
	constructor(
		_getCurrentRoute: () => ICurrentRoute,
		_navigateTo: (path: string) => void,
		_onNavigationStart: () => void
	) {
		registerRouterComponent();
		this.getCurrentRoute = _getCurrentRoute;
		this.navigateTo = _navigateTo;
		this.onNavigationStart = _onNavigationStart;
	}
}
