"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../index");
var en_1 = tslib_1.__importDefault(require("./i18n/en"));
var fr_1 = tslib_1.__importDefault(require("./i18n/fr"));
var routes = [
    {
        path: '',
        redirectTo: '/home'
    },
    {
        path: '/home',
        template: "<sample-ele></sample-ele>",
        templatePath: function () { return Promise.resolve().then(function () { return tslib_1.__importStar(require(/* webpackChunkName: "sample" */ './sample-ele')); }).then(function (t) { return t.default; }); }
    },
    {
        path: '/persons/:id',
        template: "<persons-list></persons-list>",
        templatePath: function () { return Promise.resolve().then(function () { return tslib_1.__importStar(require(/* webpackChunkName: "persons" */ './persons/persons-list')); }).then(function (t) { return t.default; }); }
    }
];
index_1.Router.registerRoutes(routes);
var AppRoot = /** @class */ (function () {
    function AppRoot(router, translations) {
        var _this = this;
        this.router = router;
        this.translations = translations;
        this.inputField = index_1.useRef(null);
        this.navigate = function (path) {
            _this.router.navigateTo(path);
        };
        translations.setTranslate(en_1.default, 'en');
        translations.setTranslate(fr_1.default, 'fr');
        translations.setDefaultLanguage('en');
    }
    AppRoot.prototype.getRef = function () {
        console.log(this.inputField);
    };
    AppRoot.prototype.render = function () {
        var _this = this;
        return index_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n\t\t <div>\n\t\t\t<ul>\n\t\t\t\t<li>\n\t\t\t\t\t<a onclick=", ">Home</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a onclick=", ">persons</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<select onchange=", ">\n\t\t\t\t<option value='en'>EN</option>\n\t\t\t\t<option value='fr'>FR</option>\n\t\t\t</select>\t\n\t\t\t<div>", "</div>\n\t\t\t<router-outlet></router-outlet>\n\t\t\t<input type='text' ref=", " /><button onclick=", ">click</button>\n    </div>\n    "], ["\n\t\t <div>\n\t\t\t<ul>\n\t\t\t\t<li>\n\t\t\t\t\t<a onclick=", ">Home</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a onclick=", ">persons</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<select onchange=", ">\n\t\t\t\t<option value='en'>EN</option>\n\t\t\t\t<option value='fr'>FR</option>\n\t\t\t</select>\t\n\t\t\t<div>", "</div>\n\t\t\t<router-outlet></router-outlet>\n\t\t\t<input type='text' ref=", " /><button onclick=", ">click</button>\n    </div>\n    "])), function () { _this.navigate('/home'); }, function () { _this.navigate('/persons/123'); }, function (e) { _this.translations.setDefaultLanguage(e.target.value); }, 'name'.translate(), this.inputField, function () { _this.getRef(); });
    };
    AppRoot = tslib_1.__decorate([
        index_1.Component({
            selector: 'app-root',
            root: true,
            styleUrl: 'main.scss'
        }),
        tslib_1.__metadata("design:paramtypes", [index_1.Router, index_1.TranslationService])
    ], AppRoot);
    return AppRoot;
}());
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9leGFtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUEyRjtBQUMzRix5REFBMkI7QUFDM0IseURBQTJCO0FBRTNCLElBQU0sTUFBTSxHQUFnQjtJQUMzQjtRQUNDLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLE9BQU87S0FDbkI7SUFDRDtRQUNDLElBQUksRUFBRSxPQUFPO1FBQ2IsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxZQUFZLEVBQUUsY0FBTSxPQUFBLHlFQUFPLGdDQUFnQyxDQUFBLGNBQWMsT0FBRSxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFULENBQVMsQ0FBQyxFQUF6RSxDQUF5RTtLQUM3RjtJQUNEO1FBQ0MsSUFBSSxFQUFFLGNBQWM7UUFDcEIsUUFBUSxFQUFFLCtCQUErQjtRQUN6QyxZQUFZLEVBQUUsY0FBTSxPQUFBLHlFQUFPLGlDQUFpQyxDQUFBLHdCQUF3QixPQUFFLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQVQsQ0FBUyxDQUFDLEVBQXBGLENBQW9GO0tBQ3hHO0NBQ0QsQ0FBQztBQUVGLGNBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFPOUI7SUFDQyxpQkFBb0IsTUFBYSxFQUFVLFlBQStCO1FBQTFFLGlCQUlDO1FBSm1CLFdBQU0sR0FBTixNQUFNLENBQU87UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFNMUUsZUFBVSxHQUF5QixjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsYUFBUSxHQUFHLFVBQUMsSUFBVztZQUNwQixLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFUQSxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsWUFBWSxDQUFDLFlBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVFELHdCQUFNLEdBQU47UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUEsd0JBQU0sR0FBTjtRQUFBLGlCQW9CQztRQW5CQyxPQUFPLFlBQUksaWhCQUFBLCtEQUlHLEVBQWdDLCtEQUdoQyxFQUF1QyxtRUFHbkMsRUFBa0UsbUhBSTlFLEVBQW9CLDhFQUVGLEVBQWUscUJBQXNCLEVBQXFCLG1DQUVqRixLQWRhLGNBQVEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFHaEMsY0FBUSxLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUduQyxVQUFDLENBQUssSUFBSyxLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBSTdFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFFRCxJQUFJLENBQUMsVUFBVSxFQUFzQixjQUFNLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFFakY7SUFDSCxDQUFDO0lBckNHLE9BQU87UUFMWixpQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsV0FBVztTQUNyQixDQUFDO2lEQUUwQixjQUFNLEVBQXVCLDBCQUFrQjtPQURyRSxPQUFPLENBc0NaO0lBQUQsY0FBQztDQUFBLEFBdENELElBc0NDIn0=