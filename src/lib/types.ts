export type DecoratorOptions = {
  selector: string
}

export type RouteItem = {
	Params: any;
	Url: string;
  Template: string;
  ParamCount: number;
}

export type Route = {
  path: string;
  template?: string;
  redirectTo?:string;
}
