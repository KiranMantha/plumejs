import { instantiate } from "./instance";
import { isFunction } from "./utils";

interface IInjector {
	get(serviceName: string): void | {};
	register(
		name: string,
		fn: Function | Object,
		serviceNames?: Array<string>
	): void;
	clear(): void;
}

const Injector: IInjector = new class implements IInjector {
	private _map: Map<string, object> = new Map();

	public get(serviceName: string): object {
		let instance = this._map.get(serviceName);
		if (instance) {
			return instance;
		} else {
			throw Error(`${serviceName} is not a registered provider.`);
		}
	}

	public clear(): void {
		this._map = new Map();
	}

	public register(serviceName: string, fn: Function | object, serviceNames: Array<string> = []) {
		if (serviceName && fn) {
			if (!this._map.get(serviceName)) {
				if (isFunction(fn)) {
					let instance = instantiate(fn as Type<Function>, serviceNames);
					this._map.set(serviceName, instance);
				} else {
					this._map.set(serviceName, fn);
				}
			}
		} else {
			throw "error: Requires name and constructor to define service";
		}
	}
}

export { Injector };

