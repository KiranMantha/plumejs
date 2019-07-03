// Import stylesheets
import { Component, Service, html } from '../index';

@Service({
  name: 'PersonService'
})
export class PersonService {
  getPersons() {
    return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
  }
}

@Component({
  name: 'persons-list',
  providers: ['PersonService']
})
class PersonsList {
  data:Array<string> = [];
  persondetails:any = {};
  update:any;
  element:any;
  constructor(private personSrvc:PersonService){}
  mount(){
    this.personSrvc.getPersons().then(data => {
      this.data = data;
      this.update(); // triggers change detection and update view
    })
  }

  alertName(user:any){
    this.persondetails = user;
    this.update();
  }

  render(){
    return html`<div>
      <ul>
      ${
        this.data.map((user:any) => html`<li onclick=${()=>{ this.alertName(user); }}>${user.name}</li>`)
      }
      </ul>
      <person-details id='person-details' props=${this.persondetails}></person-details>
    </div>`
  }
}

@Component({
  name: 'person-details',
  providers: ['props']
})
export class PersonDetails {
  constructor(private props:any){}

  render(){
    console.log('selected: user', this.props);
    if(this.props.name){
      return html`<div>Name: ${this.props.name}</div>
      <div>Company: ${this.props.company.name}</div>
      `
    } else {
      return html``;
    }
  }
}


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
class TestEle {
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
  }

  change(val:string){
    this.props.oncount(val);
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
class SampleEle {
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
    <test-ele props=${this.props}></test-ele>
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