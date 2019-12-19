export interface DecoratorOptions {
	selector: string;
	styleUrl?: string;
	root?: boolean;
	useShadow?: boolean;
}

export interface RouteItem {
	Params: any;
	Url: string;
	Template: string;
	ParamCount: number;
}

export interface Route {
	path: string;
	template?: string;
	templatePath?: string;
	redirectTo?: string;
	canActivate?: () => boolean;
}

export type Ref<T> = { current: T };

export type jsonObject = { [index: string]: any };
