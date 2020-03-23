"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../index");
const en_1 = tslib_1.__importDefault(require("./i18n/en"));
const fr_1 = tslib_1.__importDefault(require("./i18n/fr"));
let AppRoot = class AppRoot {
    constructor(router, translations) {
        this.router = router;
        this.translations = translations;
        this.routes = [
            {
                path: '',
                redirectTo: '/home'
            },
            {
                path: '/home',
                template: `<sample-ele></sample-ele>`,
                templatePath: () => Promise.resolve().then(() => tslib_1.__importStar(require('./sample-ele'))).then(t => t.default)
            },
            {
                path: '/persons/:id',
                template: `<persons-list></persons-list>`,
                templatePath: () => Promise.resolve().then(() => tslib_1.__importStar(require('./persons/persons-list'))).then(t => t.default),
                canActivate: () => {
                    let key = localStorage.getItem('key');
                    if (!key) {
                        this.router.navigateTo('/home');
                        return false;
                    }
                    return true;
                }
            }
        ];
        this.inputField = index_1.useRef(null);
        this.navigate = (path) => {
            this.router.navigateTo(path);
        };
        translations.setTranslate(en_1.default, 'en');
        translations.setTranslate(fr_1.default, 'fr');
        translations.setDefaultLanguage('en');
        index_1.Router.registerRoutes(this.routes);
    }
    getRef() {
        console.log(this.inputField);
    }
    render() {
        return index_1.html `
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
AppRoot = tslib_1.__decorate([
    index_1.Component({
        selector: 'app-root',
        root: true,
        styleUrl: 'main.scss'
    }),
    tslib_1.__metadata("design:paramtypes", [index_1.Router, index_1.TranslationService])
], AppRoot);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUEyRjtBQUMzRiwyREFBMkI7QUFDM0IsMkRBQTJCO0FBTzNCLElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBTztJQUNaLFlBQW9CLE1BQWEsRUFBVSxZQUErQjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBTzFFLFdBQU0sR0FBZ0I7WUFDckI7Z0JBQ0MsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsVUFBVSxFQUFFLE9BQU87YUFDbkI7WUFDRDtnQkFDQyxJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsMERBQXVDLGNBQWMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQzdGO1lBQ0Q7Z0JBQ0MsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQywwREFBd0Msd0JBQXdCLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDeEcsV0FBVyxFQUFFLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEMsSUFBRyxDQUFDLEdBQUcsRUFBRTt3QkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDaEMsT0FBTyxLQUFLLENBQUM7cUJBQ2I7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2IsQ0FBQzthQUNEO1NBQ0QsQ0FBQztRQUVGLGVBQVUsR0FBeUIsY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELGFBQVEsR0FBRyxDQUFDLElBQVcsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQW5DQSxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsY0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQWlDRCxNQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVBLE1BQU07UUFDSixPQUFPLFlBQUksQ0FBQTs7OztrQkFJRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O2tCQUdoQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O3NCQUduQyxDQUFDLENBQUssRUFBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztVQUk3RSxNQUFNLENBQUMsU0FBUyxFQUFHOzs0QkFFRixJQUFJLENBQUMsVUFBVSxzQkFBc0IsR0FBRSxFQUFFLEdBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUMsQ0FBQzs7S0FFakYsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBaEVLLE9BQU87SUFMWixpQkFBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsV0FBVztLQUNyQixDQUFDOzZDQUUwQixjQUFNLEVBQXVCLDBCQUFrQjtHQURyRSxPQUFPLENBZ0VaIn0=