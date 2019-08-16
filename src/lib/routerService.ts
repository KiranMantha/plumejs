import { Injector } from "./service_resolver";
import { isFunction, isArray } from "./utils";
import { RouteItem, Route } from "./types";

interface InternalRouteItem extends RouteItem {
	IsRegistered?: boolean;
	TemplatePath?: string;
}

class StaticRouter {
	static checkParams(up: Array<string>, r: RouteItem) {
		let pmc = 0,
			po: any = {},
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

	static getParamCount(p: any) {
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
			TemplatePath: '',
			ParamCount: 0,
			IsRegistered: false
		};
		obj.Params = r.path.split("/").filter((h:string) => {
			return h.length > 0;
		});
		obj.Url = r.path;
		obj.Template = "";
		if (r.template) {
			if(!r.templatePath) throw Error('templatePath is required in route if template is mentioned.')
			obj.Template = r.template;
			obj.TemplatePath = r.templatePath;
		}
		obj.ParamCount = StaticRouter.getParamCount(obj.Params);
		return obj;
	}
}

export class InternalRouter {
	currentRoute = {
		params: {}
	};
	private routeList: Array<InternalRouteItem> = [];
	private currentPage = "";
	private previousPage = "";
	private outletFn: Function = () => {};

	private _navigateTo(path: string): void {
		if (this.currentPage !== path) {
			this.previousPage = this.currentPage;
			this.currentPage = path;
			let uParams = path.split("/").filter(h => {
				return h.length > 0;
			});
			let isRouteFound = 0;
			for (let i = 0; i < this.routeList.length; i++) {
				if (isRouteFound === 0) {
					let routeItem = this.routeList[i];
					if (routeItem.Params.length === uParams.length) {
						var _params = StaticRouter.checkParams(uParams, routeItem);
						if (
							_params &&
							(Object.keys(_params).length > 0 || path === routeItem.Url)
						) {
							isRouteFound += 1;
							this.currentRoute.params = _params;
							if(!routeItem.IsRegistered) {
								require('src/'+ routeItem.TemplatePath);
								routeItem.IsRegistered = true;								
							}
							this.outletFn && this.outletFn(routeItem.Template);
							break;
						}
					}
				}
			}
		}
	}

	addRoutes(routes: Array<Route>) {
		if (isArray(routes)) {
			let redirectRoute = null;
			for (let route of routes) {
				this.routeList.push(StaticRouter.formatRoute(route));
				if (route.redirectTo) {
					redirectRoute = route;
				}
			}
			if (redirectRoute) {
				this.navigateTo(redirectRoute.redirectTo);
			}
		} else {
			throw Error("router.addRoutes: the parameter must be an array");
		}
  }
  
  getCurrentRoute(){
    return this.currentRoute;
  }

	navigateTo(path: string = "") {
		window.history.pushState(null, '', path);
		this._navigateTo(path);
	}

	setOutletFn(fn: Function) {
		this.outletFn = fn;
	}

	onNavigationStart(cb: any) {
		if (cb && isFunction(cb)) {
			window.addEventListener("hashchange", cb, false);
		}
	}
}

export class Router {
	getCurrentRoute:Function = () => {};
	navigateTo: Function = () => {};
	onNavigationStart: Function = () => {};
	constructor(
		_getCurrentRoute: Function,
		_navigateTo: Function,
		_onNavigationStart: Function
	) {
		this.getCurrentRoute = _getCurrentRoute;
		this.navigateTo = _navigateTo;
		this.onNavigationStart = _onNavigationStart;
  }
}

const _internalRouter = new InternalRouter();

Injector.register("InternalRouter", _internalRouter);
Injector.register(
	"Router",
	new Router(
		_internalRouter.getCurrentRoute.bind(_internalRouter),
		_internalRouter.navigateTo.bind(_internalRouter),
		_internalRouter.onNavigationStart.bind(_internalRouter)
	)
);
