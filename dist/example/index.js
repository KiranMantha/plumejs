"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const en_1 = __importDefault(require("./i18n/en"));
const fr_1 = __importDefault(require("./i18n/fr"));
let AppRoot = class AppRoot {
    constructor(router, translations) {
        this.router = router;
        this.routes = [
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
        ];
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
        this.inputField = index_1.useRef(null);
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
			<router-outlet routes=${this.routes}></router-outlet>
			<input type='text' ref=${this.inputField} /><button onclick=${() => { this.getRef(); }}>click</button>
    </div>
    `;
    }
};
AppRoot = __decorate([
    index_1.Component({
        selector: 'app-root',
        root: true,
        styleUrl: 'main.scss'
    }),
    __metadata("design:paramtypes", [index_1.Router, index_1.TranslationService])
], AppRoot);
//# sourceMappingURL=index.js.map