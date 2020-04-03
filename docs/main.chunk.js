(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{41:function(e,a,t){"use strict";t.r(a),t.d(a,"AppComponent",(function(){return l}));var s=t(0),n=t(1),r=t(8);var i={username:{greet:"my name is {name}"}};var o={username:{greet:"je m`appelle {name}"}};Object(r.registerToggleComponent)(),Object(r.registerMultiSelectComponent)();let l=class AppComponent{constructor(e,a){this.router=e,this.translations=a,this.showNav=!1,this.routes=[{path:"",redirectTo:"/home"},{path:"/home",template:"<sample-ele></sample-ele>",templatePath:()=>t.e(5).then(t.bind(null,42))},{path:"/controls",template:"<plume-comp></plume-comp>",templatePath:()=>t.e(4).then(t.bind(null,45))},{path:"/persons/:id",template:"<persons-list></persons-list>",templatePath:()=>t.e(3).then(t.bind(null,43)),canActivate:()=>!!localStorage.getItem("plumejs")||(this.router.navigateTo("/home"),!1)},{path:"/form",template:"<sample-form></sample-form>",templatePath:()=>t.e(6).then(t.bind(null,44))}],this.navigate=(e,a)=>{e.preventDefault(),this.router.navigateTo(a)},n.Router.registerRoutes(this.routes),a.setTranslate(i,"en"),a.setTranslate(o,"fr"),a.setDefaultLanguage("en")}_displayNav(){this.showNav=!this.showNav,this.update()}render(){return n.html`
			<nav class="navbar is-light" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item" href="#" onclick=${e=>{this.navigate(e,"/home")}}>
						PlumeJS
					</a>
			
					<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" onclick=${e=>{e.preventDefault(),this._displayNav()}}>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>
			
				<div id="navbarBasicExample" class="navbar-menu ${this.showNav?"is-active":""}">
					<div class="navbar-start">
						<a class="navbar-item"
							href="#"
							onclick=${e=>{this.navigate(e,"/home")}}>
							Home
						</a>
			
						<a class="navbar-item"
							href="#"
							onclick=${e=>{this.navigate(e,"/controls")}}>
							UI Controls
						</a>
					
						<a class="navbar-item"
							href="#"
							onclick=${e=>{this.navigate(e,"/persons/123")}}>
							Persons
						</a>
					
						<a class="navbar-item"
							href="#"
							onclick=${e=>{this.navigate(e,"/form")}}>
							Sample Form
						</a>
			
						<div class="navbar-item">
							<div class="select">
								<select
									class="form-control"
									onchange=${e=>{this.translations.setDefaultLanguage(e.target.value)}}
									>
									<option value="en">EN</option>
									<option value="fr">FR</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</nav>	
			<slot></slot>
    `}};l=Object(s.__decorate)([Object(n.Component)({selector:"app-root",styleUrl:"styles.scss",useShadow:!1,root:!0}),Object(s.__metadata)("design:paramtypes",[n.Router,n.TranslationService])],l)}},[[41,1,2]]]);