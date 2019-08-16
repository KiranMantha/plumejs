export interface DecoratorOptions {
  selector: string,
  styleUrl?: string,
  root?:boolean
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
  redirectTo?:string;
}

export type Ref<T> = {current: T};
