import { Injector } from './service_resolver';

const setDI = (fn: Function, deps: Array<string>): Array<any> => {
  let di: Array<any> = [],
    finalArr = [];
  deps.map((o: string) => {
    let service = Injector.get(o);
    service && di.push(service);
  });
  finalArr = [fn, di];
  return finalArr;
}

export { setDI };

