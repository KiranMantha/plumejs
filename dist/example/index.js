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
        templatePath: () => import('./sample-ele').then(t => t.default)
    },
    {
        path: '/persons/:id',
        template: `<persons-list></persons-list>`,
        templatePath: () => import('./persons/persons-list').then(t => t.default)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQVMsTUFBTSxFQUFPLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMzQixPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFM0IsTUFBTSxNQUFNLEdBQWdCO0lBQzNCO1FBQ0MsSUFBSSxFQUFFLEVBQUU7UUFDUixVQUFVLEVBQUUsT0FBTztLQUNuQjtJQUNEO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQWlDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDN0Y7SUFDRDtRQUNDLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBa0Msd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ3hHO0NBQ0QsQ0FBQztBQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFPOUIsSUFBTSxPQUFPLEdBQWIsTUFBTSxPQUFPO0lBQ1osWUFBb0IsTUFBYSxFQUFVLFlBQStCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQU87UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFNMUUsZUFBVSxHQUF5QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsYUFBUSxHQUFHLENBQUMsSUFBVyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBVEEsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFRRCxNQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVBLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQTs7OztrQkFJRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O2tCQUdoQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O3NCQUduQyxDQUFDLENBQUssRUFBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztVQUk3RSxNQUFNLENBQUMsU0FBUyxFQUFHOzs0QkFFRixJQUFJLENBQUMsVUFBVSxzQkFBc0IsR0FBRSxFQUFFLEdBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUMsQ0FBQzs7S0FFakYsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBdENLLE9BQU87SUFMWixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxXQUFXO0tBQ3JCLENBQUM7cUNBRTBCLE1BQU0sRUFBdUIsa0JBQWtCO0dBRHJFLE9BQU8sQ0FzQ1oifQ==