import { Component, html, Router, Route, useRef, Ref, TranslationService } from "../index";
import en from './i18n/en';
import fr from './i18n/fr';

@Component({
	selector: 'app-root',
	root: true,
	styleUrl: 'main.scss'
})
class AppRoot {
	constructor(private router:Router, private translations:TranslationService) {
		translations.setTranslate(en, 'en');
		translations.setTranslate(fr, 'fr');
		translations.setDefaultLanguage('en');
	}

	inputField:Ref<HTMLInputElement> = useRef(null);
	
  routes:Array<Route> = [
		{
			path: '',
			redirectTo: '/home'
		},
		{
			path: '/home',
			template: `<sample-ele></sample-ele>`,
			templatePath: 'sample-ele.ts'
		},
		{
			path: '/persons/:id',
			template: `<persons-list></persons-list>`,
			templatePath: 'persons-list.ts'
		}
	]
	
	navigate = (path:string) => {
    this.router.navigateTo(path);
	}
	
	getRef(){
		console.log(this.inputField);
	}

  render() {
    return html`
		 <div>
			<ul>
				<li>
					<a onclick=${() => { this.navigate('/home') }}>Home</a>
				</li>
				<li>
					<a onclick=${() => { this.navigate('/persons/123') }}>persons</a>
				</li>
			</ul>
			<select onchange=${(e:any)=>{ this.translations.setDefaultLanguage(e.target.value); }}>
				<option value='en'>EN</option>
				<option value='fr'>FR</option>
			</select>	
			<div>${ 'name'.translate() }</div>
			<router-outlet routes=${ this.routes }></router-outlet>
			<input type='text' ref=${this.inputField} /><button onclick=${()=>{ this.getRef() }}>click</button>
    </div>
    `
  }
}
