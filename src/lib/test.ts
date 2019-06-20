

let service_registry = {};
import {instantiate} from './instance';

const Service = (options:any={}) => {
  return (target) => {
    let service_instance = instantiate(target, options.providers);
    service_registry[target.name] = service_instance;
  }
}

@Service()
class TestService {
  testMeth() {
    console.log('testmethod in sample service');
  }
}

@Service({
  providers: ['TestService']
})
class SampleService {
  constructor(private testsrvc:TestService) { }
  testMeth() {
    this.testsrvc.testMeth();
  }
}