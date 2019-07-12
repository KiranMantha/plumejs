import { instantiate } from "./instance";
import { isString, isFunction } from "./utils";

const Injector = (() => {
	interface IService {
		[key: string]: any;
	}
	let _services: IService = {};
	const _getService = (name: string) => {
		if (isString(name)) {
			if (_services[name]) {
				return _services[name];
			} else {
				throw Error(`${name} is not a registered provider.`);
			}
		} else {
			return {};
		}
	};

	function _service(name: string, fn:Function, deps: Array<string>): void;
	function _service(name:string, fn:Object):void;

	function _service(
		name: any,
		fn: any,
		deps: any = []
	) {
		if (name && fn) {
			if (!_services[name]) {
				if (isFunction(fn)) {
					_services[name] = instantiate(fn, deps);
				} else {
					_services[name] = fn;
				}
			}
		} else {
			throw "error: Requires name and constructor to define service";
		}
	};

	return {
		get: _getService,
		register: _service
	};
})();

export { Injector };
