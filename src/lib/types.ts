type DecoratorOptions = {
  selector: string
}

type RouteItem = {
	Params: any;
	Url: string;
  Template: string;
  ParamCount: number;
}

type Route = {
  path: string;
  template?: string;
  redirectTo?:string;
}
