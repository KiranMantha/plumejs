(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{43:function(e,t,s){"use strict";s.r(t);var r=s(0),o=s(1);let a=class PersonService{getPersons(){return fetch("https://jsonplaceholder.typicode.com/users").then(e=>e.json())}};a=Object(r.__decorate)([Object(o.Injectable)()],a);let i=class PersonsList{constructor(e,t){this.personSrvc=e,this.router=t,this.data=[],this.persondetails={},console.log("current route ",this.router.getCurrentRoute())}mount(){this.personSrvc.getPersons().then(e=>{this.data=e,this.update()})}alertName(e){this.persondetails=e,this.update()}render(){return o.html`
			<h4>Sample service injection with http call and passing data to other component</h4>
			Current route data: <code>${JSON.stringify(this.router.getCurrentRoute(),null,2)}</code>
			<div class='mt-20 mb-20'>
				<div class="list is-hoverable">
					${this.data.map(e=>o.html`
								<a href='#' class="list-item"
									onclick=${t=>{t.preventDefault(),this.alertName(e)}}
								>
									${e.name}
								</a>
							`)}
				</div>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`}};i=Object(r.__decorate)([Object(o.Component)({selector:"persons-list",styleUrl:"persons-list.scss",useShadow:!1}),Object(r.__metadata)("design:paramtypes",[a,o.Router])],i);let n=class PersonDetails{constructor(){this.userDetails={}}render(){return console.log("selected: user",this.userDetails),this.userDetails.name?o.html`
				<strong>Person Details</strong>
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>
			`:o.html`<div></div>`}};Object(r.__decorate)([Object(o.Input)(),Object(r.__metadata)("design:type",Object)],n.prototype,"userDetails",void 0),n=Object(r.__decorate)([Object(o.Component)({selector:"person-details"})],n)}}]);