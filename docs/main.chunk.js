(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{41:function(e,t,a){"use strict";a.r(t),a.d(t,"AppComponent",(function(){return i}));var n=a(0),l=a(1),s=a(8);var o={username:{greet:"my name is {name}"}};var r={username:{greet:"je m`appelle {name}"}};Object(s.registerToggleComponent)(),Object(s.registerMultiSelectComponent)();let i=class AppComponent{constructor(e,t){this.router=e,this.translations=t,this.routes=[{path:"",redirectTo:"/home"},{path:"/home",template:"<sample-ele></sample-ele>",templatePath:()=>a.e(5).then(a.bind(null,42))},{path:"/controls",template:"<plume-comp></plume-comp>",templatePath:()=>a.e(4).then(a.bind(null,45))},{path:"/persons/:id",template:"<persons-list></persons-list>",templatePath:()=>a.e(3).then(a.bind(null,43)),canActivate:()=>!!localStorage.getItem("plumejs")||(this.router.navigateTo("/home"),!1)},{path:"/form",template:"<sample-form></sample-form>",templatePath:()=>a.e(6).then(a.bind(null,44))}],this.navigate=(e,t)=>{e.preventDefault(),this.router.navigateTo(t)},l.Router.registerRoutes(this.routes),t.setTranslate(o,"en"),t.setTranslate(r,"fr"),t.setDefaultLanguage("en")}render(){return l.html`
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#" onclick=${e=>{this.navigate(e,"/home")}}>PlumeJS</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a
							class="nav-link"
							href="#"
							onclick=${e=>{this.navigate(e,"/home")}}
							>Home
						</a>
					</li>
					<li class="nav-item active">
						<a
							class="nav-link"
							href="#"
							onclick=${e=>{this.navigate(e,"/controls")}}
							>UI Controls
						</a>
					</li>
					<li class="nav-item active">
						<a
							class="nav-link"
							href="#"
							onclick=${e=>{this.navigate(e,"/persons/123")}}
							>Persons</a
						>
					</li>
					<li class="nav-item active">
						<a
							class="nav-link"
							href="#"
							onclick=${e=>{this.navigate(e,"/form")}}
							>Sample Form</a
						>
					</li>
					<li class="nav-item dropdown">
						<select
							class="form-control"
							onchange=${e=>{this.translations.setDefaultLanguage(e.target.value)}}
						>
							<option value="en">EN</option>
							<option value="fr">FR</option>
						</select>
					</li>
				</ul>
			</div>
		</nav>
		<div class="container">	
			<h1 class="title">Hello world</h1>	
			<router-outlet></router-outlet>
		</div>
    `}};i=Object(n.__decorate)([Object(l.Component)({selector:"app-root",styleUrl:"styles.scss",root:!0}),Object(n.__metadata)("design:paramtypes",[l.Router,l.TranslationService])],i)}},[[41,1,2]]]);