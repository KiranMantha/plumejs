type Type<T> = {
  new (...args: any[]): T;
};

type DecoratorOptions = {
  selector: string
}

type Token<T> = Type<T>;

type Dictionary = {
  [key: string]: any;
};

type GenericClassDecorator<T> = (target: T) => void;

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
