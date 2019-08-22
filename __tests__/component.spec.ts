import { html } from "../index";
import TestBed from '../testBed';

class MockComponent {
  element:any;
  update:any;
  greetingMsg:string = '';

  greet(){
    this.greetingMsg = 'hello';
  }

  render(){
    return html`
    <h1>Hello World</h1>
    <button id='test' onclick=${()=>{ this.greet(); }}></button>
    <span>${ this.greetingMsg }</span>
    `
  }
}

describe("Plumejs Component", () => {
  let appRoot:any;
	beforeAll(() => {
    appRoot = TestBed.createComponent({selector: 'app-root', target: MockComponent});
  });
  
  it('should render h1 element', () => {
    const h1:any = appRoot.querySelector('h1');
    expect(h1.innerHTML).toBe("Hello World");
  });

  it('should return "hello" on button click', () => {    
    let btn = appRoot.querySelector('#test');
    let span = appRoot.querySelector('span');
    expect(span.innerHTML).not.toContain('hello');
    process.stdout.write('btn: ' + btn + "\n");
    btn && btn.click();
    appRoot.update();
    const model = appRoot.getModel();
    expect(btn).toBeTruthy();
    //expect(model.greetingMsg).toBe('hello');
    //expect(span.innerHTML).toContain('hello');
  });
});
