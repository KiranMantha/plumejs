import { MetadataConstructor } from './types';
interface IInjector {
    register: <T>(klass: MetadataConstructor<T>, instance: T) => void;
    getService: <T>(klass: T) => MetadataConstructor<T>;
    removeService: <T>(klass: MetadataConstructor<T>) => void;
    clear: () => void;
}
declare const Injector: IInjector;
export { Injector };
