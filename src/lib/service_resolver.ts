import { instantiate } from "./instance";
import { isFunction } from "./utils";
import { TranslationService } from "./translationService";
import { InternalRouter, Router } from "./routerService";

interface IInjector {
	getService(name: string): void | {};
	registerService(
		name: string,
		fn: Function | Object,
		deps?: Array<string>
	): void;
	clear():void;
}

const Injector = (() => {
	class InternalInjector implements IInjector {
		private _map: Map<string, any> = new Map();
		private get: (key: string) => any;
		private set: (key: string, value: object) => Map<any, any>;
		constructor() {
			this.get = this._map.get.bind(this._map);
			this.set = this._map.set.bind(this._map);
			this._defaultServices();
		}

		private _defaultServices() {
			let compiledCSSObj = JSON.parse(JSON.stringify(process.env.COMPILEDCSSOBJ));
			this.registerService("COMPILEDCSS", new Map(Object.entries(compiledCSSObj)));
			this.registerService("TranslationService", new TranslationService());
			const _internalRouter = new InternalRouter();
			this.registerService("InternalRouter", _internalRouter);
			this.registerService(
				"Router",
				new Router(
					_internalRouter.getCurrentRoute.bind(_internalRouter),
					_internalRouter.navigateTo.bind(_internalRouter),
					_internalRouter.onNavigationStart.bind(_internalRouter)
				)
			);
		}

		public getService(name: string) {
			let instance = this.get(name);
			if (instance) {
				return instance;
			} else {
				throw Error(`${name} is not a registered provider.`);
			}
		}

		public clear():void {
			this._map = new Map();
		}

		public registerService(name: string, fn: any, deps: Array<string> = []) {
			if (name && fn) {
				if (!this.get(name)) {
					if (isFunction(fn)) {
						let instance = instantiate(fn, deps);
						this.set(name, instance);
					} else {
						this.set(name, fn);
					}
				}
			} else {
				throw "error: Requires name and constructor to define service";
			}
		}
	}

	const injectorInstance: IInjector = new InternalInjector();

	return {
		register: injectorInstance.registerService.bind(injectorInstance),
		get: injectorInstance.getService.bind(injectorInstance),
		clear: injectorInstance.clear.bind(injectorInstance)
	};
})();

export { Injector };
