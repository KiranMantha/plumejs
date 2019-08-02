export interface DecoratorOptions {
  selector: string,
  styleUrl?: string,
  styles?: string
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
  redirectTo?:string;
}

export type Ref<T> = {current: T};
