"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../index");
const en_1 = tslib_1.__importDefault(require("./i18n/en"));
const fr_1 = tslib_1.__importDefault(require("./i18n/fr"));
const routes = [
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
        templatePath: () => Promise.resolve().then(() => tslib_1.__importStar(require('./persons/persons-list'))).then(t => t.default)
    }
];
index_1.Router.registerRoutes(routes);
let AppRoot = class AppRoot {
    constructor(router, translations) {
        this.router = router;
        this.translations = translations;
        this.inputField = index_1.useRef(null);
        this.navigate = (path) => {
            this.router.navigateTo(path);
        };
        translations.setTranslate(en_1.default, 'en');
        translations.setTranslate(fr_1.default, 'fr');
        translations.setDefaultLanguage('en');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUEyRjtBQUMzRiwyREFBMkI7QUFDM0IsMkRBQTJCO0FBRTNCLE1BQU0sTUFBTSxHQUFnQjtJQUMzQjtRQUNDLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLE9BQU87S0FDbkI7SUFDRDtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsMERBQXVDLGNBQWMsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQzdGO0lBQ0Q7UUFDQyxJQUFJLEVBQUUsY0FBYztRQUNwQixRQUFRLEVBQUUsK0JBQStCO1FBQ3pDLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQywwREFBd0Msd0JBQXdCLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUN4RztDQUNELENBQUM7QUFFRixjQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTzlCLElBQU0sT0FBTyxHQUFiLE1BQU0sT0FBTztJQUNaLFlBQW9CLE1BQWEsRUFBVSxZQUErQjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBTTFFLGVBQVUsR0FBeUIsY0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELGFBQVEsR0FBRyxDQUFDLElBQVcsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQVRBLFlBQVksQ0FBQyxZQUFZLENBQUMsWUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxZQUFZLENBQUMsWUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBUUQsTUFBTTtRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFQSxNQUFNO1FBQ0osT0FBTyxZQUFJLENBQUE7Ozs7a0JBSUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUM7OztrQkFHaEMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQSxDQUFDLENBQUM7OztzQkFHbkMsQ0FBQyxDQUFLLEVBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7VUFJN0UsTUFBTSxDQUFDLFNBQVMsRUFBRzs7NEJBRUYsSUFBSSxDQUFDLFVBQVUsc0JBQXNCLEdBQUUsRUFBRSxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUM7O0tBRWpGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXRDSyxPQUFPO0lBTFosaUJBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLFdBQVc7S0FDckIsQ0FBQzs2Q0FFMEIsY0FBTSxFQUF1QiwwQkFBa0I7R0FEckUsT0FBTyxDQXNDWiJ9