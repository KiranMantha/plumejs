import { html } from "../index";
import TestBed from '../testBed';

class MockComponent {
  element:any;
  update:any;
  greetingMsg:string = '';

  greet(){
    this.greetingMsg = 'hello';
    this.update();
  }

  render(){
    return html`
    <h1>Hello World</h1>
    <button onclick=${()=>{ this.greet(); }}>click</button>
    <span>${ this.greetingMsg }</span>
    `;
  }
}

describe("Plumejs Component", () => {
  let appRoot:any;
	beforeAll(async () => {
    appRoot = await TestBed.MockComponent({selector: 'app-root', target: MockComponent});
  });
  
  it('should render h1 element', () => {
    const h1:any = appRoot.querySelector('h1');
    expect(h1.innerHTML).toBe("Hello World");
  });

  it('should return "hello" on button click', () => { 
    let span = appRoot.querySelector('span');
    const model = appRoot.getModel();
    expect(span.innerHTML).not.toContain('hello');
    model.greet();
    expect(span.innerHTML).toContain('hello');
  });
});
