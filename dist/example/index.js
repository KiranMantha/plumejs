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
        templatePath: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "sample" */ './sample-ele'))).then(t => t.default)
    },
    {
        path: '/persons/:id',
        template: `<persons-list></persons-list>`,
        templatePath: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "persons" */ './persons/persons-list'))).then(t => t.default)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUEyRjtBQUMzRiwyREFBMkI7QUFDM0IsMkRBQTJCO0FBRTNCLE1BQU0sTUFBTSxHQUFnQjtJQUMzQjtRQUNDLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLE9BQU87S0FDbkI7SUFDRDtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsMERBQU8sZ0NBQWdDLENBQUEsY0FBYyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDN0Y7SUFDRDtRQUNDLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLDBEQUFPLGlDQUFpQyxDQUFBLHdCQUF3QixJQUFFLElBQUksQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDeEc7Q0FDRCxDQUFDO0FBRUYsY0FBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQU85QixJQUFNLE9BQU8sR0FBYixNQUFNLE9BQU87SUFDWixZQUFvQixNQUFhLEVBQVUsWUFBK0I7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQU0xRSxlQUFVLEdBQXlCLGNBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxhQUFRLEdBQUcsQ0FBQyxJQUFXLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFUQSxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVFELE1BQU07UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUEsTUFBTTtRQUNKLE9BQU8sWUFBSSxDQUFBOzs7O2tCQUlHLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFDOzs7a0JBR2hDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUEsQ0FBQyxDQUFDOzs7c0JBR25DLENBQUMsQ0FBSyxFQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1VBSTdFLE1BQU0sQ0FBQyxTQUFTLEVBQUc7OzRCQUVGLElBQUksQ0FBQyxVQUFVLHNCQUFzQixHQUFFLEVBQUUsR0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQyxDQUFDOztLQUVqRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF0Q0ssT0FBTztJQUxaLGlCQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxXQUFXO0tBQ3JCLENBQUM7NkNBRTBCLGNBQU0sRUFBdUIsMEJBQWtCO0dBRHJFLE9BQU8sQ0FzQ1oifQ==