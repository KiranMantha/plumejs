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
