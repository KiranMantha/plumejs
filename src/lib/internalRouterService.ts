import { ICurrentRoute } from './types';
import { Subject, Observable, from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StaticRouter } from './staticRouter';
import { isFunction } from './utils';
import { Injectable } from './decorators';

function wrapIntoObservable(value: Promise<any>): Observable<any> {
	return from(Promise.resolve(value)).pipe(
		mergeMap((t: any) => {
			return of(t);
		})
	);
}

@Injectable()
export class InternalRouter {
	currentRoute: ICurrentRoute = {
		params: {}
	};
	private currentPage: string = null;
	private previousPage = "";
	$templateSubscriber = new Subject();

	private _routeMatcher(route: string, path: string) {
		if (route) {
			let _matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
			return path.match(_matcher);
		} else {
			return route === path;
		}
	}

	private _navigateTo(path: string) {
		if (this.currentPage !== path) {
			this.previousPage = this.currentPage;
			this.currentPage = path;
			let uParams = path.split("/").filter(h => {
				return h.length > 0;
			});
			let routeArr = StaticRouter.routList.filter(route => {
				if (route.Params.length === uParams.length && this._routeMatcher(route.Url, path)) {
					return route;
				} else if (route.Url === path) {
					return route;
				}
			});
			let routeItem = routeArr.length > 0 ? routeArr[0] : null;
			if (routeItem) {
				let _params = StaticRouter.checkParams(uParams, routeItem);
				if (Object.keys(_params).length > 0 || path) {
					this.currentRoute.params = _params;
					if (!routeItem.IsRegistered) {
						if (routeItem.TemplatePath) {
							wrapIntoObservable(routeItem.TemplatePath()).subscribe((res: any) => {
								routeItem.IsRegistered = true;
								window.history.pushState(null, "", path);
								this.$templateSubscriber.next(routeItem.Template);
							});
						}
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