import { instantiate } from "./instance";
import { isString } from "./utils";

const ServiceResolver = (() => {
	interface IService {
		[key: string]: any;
	}
	let _services: IService = {};
	const _getService = (name: string) => {
		if (isString(name)) {
			if(_services[name]) {
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
				_services[name] = instantiate(fn, deps).instance;
			}
		} else {
			throw "error: Requires name and constructor to define service";
		}
	};

	return {
		getService: _getService,
		registerService: _service
	};
})();

export const { getService, registerService } = ServiceResolver;
