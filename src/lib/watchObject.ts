const defineProp = (obj:any, propName:string, value:any) => {
	try {
			Object.defineProperty(obj, propName, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
			});
	} catch(error) {
			obj[propName] = value;
	}
};

const watch = (obj: any, prop: string, handler: Function) => {
	let desc = Object.getOwnPropertyDescriptor(obj, prop);
	if (!desc) {
		defineProp(obj, prop, null);
		defineProp(obj, '__old'+prop, 0);
		defineProp(obj, '__new'+prop, 1);
	}
	let interval = setInterval(() => {		
		obj['__old'+prop] = obj['__new'+prop];
		obj['__new'+prop] = obj[prop];
		handler(obj['__old'+prop], obj['__new'+prop]);		
	}, 50);
	defineProp(obj, '__watchinterval__', interval);
};

const unwatch = (obj: any) => {
	let desc = Object.getOwnPropertyDescriptor(obj, '__watchinterval__');
	if(desc && desc.value) {
		clearInterval(desc.value);
	}
};

export { watch, unwatch };
