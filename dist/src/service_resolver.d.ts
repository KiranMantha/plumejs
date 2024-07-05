import { ConstructorType } from './types';
interface IInjector {
    register: <T>(klass: ConstructorType<T>, instance: T) => void;
    getService: <T>(klass: T) => ConstructorType<T>;
    removeService: <T>(klass: ConstructorType<T>) => void;
    clear: () => void;
}
declare const Injector: IInjector;
export { Injector };
