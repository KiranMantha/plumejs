import { instantiate } from "./instance";
import { isFunction } from "./utils";

interface IInjector {
	getService(name: string): void | {};
	registerService(
		name: string,
		fn: Function | Object,
		deps?: Array<string>
	): void;
}

const Injector = (() => {
	class InternalInjector implements IInjector {
		private get: (key: string) => any;
		private set: (key: string, value: object) => Map<any, any>;
		constructor() {
			let _map = new Map();
			this.get = _map.get.bind(_map);
			this.set = _map.set.bind(_map);
		}

		public getService(name: string) {
			let instance = this.get(name);
			if (instance) {
				return instance;
			} else {
				throw Error(`${name} is not a registered provider.`);
			}
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
		get: injectorInstance.getService.bind(injectorInstance)
	};
})();

export { Injector };
