// Import stylesheets
import { Component, Service, html, IWebComponent } from '../index';

@Service({
  name: 'SampleService'
})
class SampleService {
  constructor() { }
  testMeth() {
    console.log('testmethod in sample service');
  }
}

@Service({
  name: 'TestService',
  providers: ['SampleService']
})
class TestService {
  constructor(private sampleSrvc: SampleService) { }
  testMeth() {
    this.sampleSrvc.testMeth();
  }

  getUsers() {
    return fetch('https://api.github.com/users?since=135');
  }
}

@Component({
  name: 'test-ele',
  providers: ['props']
})
class TestEle implements IWebComponent {
  update:any;
  constructor(private props:any) {
    this.props = props;
  }

  render() {
    return html`<div>
      testing web component2 ${this.props.name}
      <button onclick=${(e:any) => this.counts(e)}>hi</button>
      <input value=${this.props.name} oninput=${(e:any)=>this.change(e.target.value)}/>
    </div>`
  }

  counts(e:any) {
    this.props.oncount('testing from click');
    this.update();
  }

  change(val:string){
    this.props.oncount(val);
    this.update();
  }

  mount() {
    console.log('component loaded');
    console.log('props: ', this.props);
  }

  unmount() {
    console.log('component unloaded');
  }
}

@Component({
  name: 'sample-ele',
  providers: ['TestService']
})
class SampleEle implements IWebComponent {
  test:string;
  outCount:Function;
  update:any;
  props:any;
  constructor(private testSrvc: TestService) {
    this.test = 'sample 123';
    this.outCount = this.count.bind(this);
    this.props = {
      oncount: this.outCount,
      name: this.test
    }
  }

  render() {
    return html`<div>
    testing web component1 ${this.test}
    <test-ele data=${this.props}></test-ele>
    </div>`
  }

  count(val:string) {
    this.test = val;
    this.props.name = val;
    this.update();
  }

  beforeMount() {
    console.log('before mounting...');
  };

  mount() {
    console.log('component loaded');
    this.testSrvc.testMeth();
  }

  unmount() {
    console.log('component unloaded');
  }
}