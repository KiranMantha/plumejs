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
	templatePath?: () => Promise<any>;
	redirectTo?: string;
	canActivate?: () => boolean;
}

interface ICurrentRoute {
	params: { [key: string]: string | number | boolean };
}

interface InternalRouteItem extends RouteItem {
	IsRegistered?: boolean;
	TemplatePath?: () => Promise<any>;
	redirectTo?: string;
}

type Ref<T> = { current: T };
type jsonObject = { [index: string]: any };

export { DecoratorOptions, RouteItem, Route,InternalRouteItem, Ref, jsonObject, ICurrentRoute };
