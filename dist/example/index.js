import { __decorate, __metadata } from "tslib";
import { Component, html, Router, useRef, TranslationService } from "../index";
import en from './i18n/en';
import fr from './i18n/fr';
const routes = [
    {
        path: '',
        redirectTo: '/home'
    },
    {
        path: '/home',
        template: `<sample-ele></sample-ele>`,
        templatePath: () => import(/* webpackChunkName: "sample" */ './sample-ele').then(t => t.default)
    },
    {
        path: '/persons/:id',
        template: `<persons-list></persons-list>`,
        templatePath: () => import(/* webpackChunkName: "persons" */ './persons/persons-list').then(t => t.default)
    }
];
Router.registerRoutes(routes);
let AppRoot = class AppRoot {
    constructor(router, translations) {
        this.router = router;
        this.translations = translations;
        this.inputField = useRef(null);
        this.navigate = (path) => {
            this.router.navigateTo(path);
        };
        translations.setTranslate(en, 'en');
        translations.setTranslate(fr, 'fr');
        translations.setDefaultLanguage('en');
    }
    getRef() {
        console.log(this.inputField);
    }
    render() {
        return html `
		 <div>
			<ul>
				<li>
					<a onclick=${() => { this.navigate('/home'); }}>Home</a>
				</li>
				<li>
					<a onclick=${() => { this.navigate('/persons/123'); }}>persons</a>
				</li>
			</ul>
			<select onchange=${(e) => { this.translations.setDefaultLanguage(e.target.value); }}>
				<option value='en'>EN</option>
				<option value='fr'>FR</option>
			</select>	
			<div>${'name'.translate()}</div>
			<router-outlet></router-outlet>
			<input type='text' ref=${this.inputField} /><button onclick=${() => { this.getRef(); }}>click</button>
    </div>
    `;
    }
};
AppRoot = __decorate([
    Component({
        selector: 'app-root',
        root: true,
        styleUrl: 'main.scss'
    }),
    __metadata("design:paramtypes", [Router, TranslationService])
], AppRoot);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQVMsTUFBTSxFQUFPLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMzQixPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0IsTUFBTSxNQUFNLEdBQWdCO0lBQzNCO1FBQ0MsSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsT0FBTztLQUNuQjtJQUNEO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUEsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUM3RjtJQUNEO1FBQ0MsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLCtCQUErQjtRQUN6QyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFBLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUN4RztDQUNELENBQUM7QUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTzlCLElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBTztJQUNaLFlBQW9CLE1BQWEsRUFBVSxZQUErQjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBTTFFLGVBQVUsR0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELGFBQVEsR0FBRyxDQUFDLElBQVcsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQVRBLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBUUQsTUFBTTtRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFQSxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUE7Ozs7a0JBSUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUM7OztrQkFHaEMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQSxDQUFDLENBQUM7OztzQkFHbkMsQ0FBQyxDQUFLLEVBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7VUFJN0UsTUFBTSxDQUFDLFNBQVMsRUFBRzs7NEJBRUYsSUFBSSxDQUFDLFVBQVUsc0JBQXNCLEdBQUUsRUFBRSxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUM7O0tBRWpGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXRDSyxPQUFPO0lBTFosU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsV0FBVztLQUNyQixDQUFDO3FDQUUwQixNQUFNLEVBQXVCLGtCQUFrQjtHQURyRSxPQUFPLENBc0NaIn0=