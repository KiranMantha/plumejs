interface DecoratorOptions {
	selector: string;
	styleUrl?: string;
	root?: boolean;
	useShadow?: boolean;
}

interface RouteItem {
	Params: any;
	Url: string;
	Template: string;
	ParamCount: number;
}

interface Route {
	path: string;
	template?: string;
	templatePath?: string;
	redirectTo?: string;
	canActivate?: () => boolean;
}

type Ref<T> = { current: T };
type jsonObject = { [index: string]: any };

export { DecoratorOptions, RouteItem, Route, Ref, jsonObject };
