import { instantiate } from "./instance";
import { isString } from "./utils";

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

	const _service = (name: string, fn: Function, deps: Array<string> = []) => {
		if (name && fn) {
			if (!_services[name]) {
				_services[name] = instantiate(fn, deps);
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
