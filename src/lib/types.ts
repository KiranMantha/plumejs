interface DecoratorOptions {
	selector: string;
	styles?: string;
	root?: boolean;
	useShadow?: boolean;
}

interface IHooks {
	mount?: () => void;
	unmount?: () => void;
	inputChanged?: (oldValue: any, newValue: any) => void;
	update?: () => void;
}

type Ref<T> = { current: T };
type jsonObject = { [index: string]: any };

export { DecoratorOptions, Ref, jsonObject, IHooks };

