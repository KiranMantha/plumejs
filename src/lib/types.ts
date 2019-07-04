type Type<T> = {
  new (...args: any[]): T;
};

type DecoratorOptions = {
  name: string;,
  providers?:Array<any>
}

type Dictionary = {
  [key: string]: any;
};

type GenericClassDecorator<T> = (target: T) => void;
