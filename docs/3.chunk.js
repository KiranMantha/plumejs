(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{43:function(e,t,s){"use strict";s.r(t);var r=s(0),o=s(1);let i=class PersonService{getPersons(){return fetch("https://jsonplaceholder.typicode.com/users").then(e=>e.json())}};i=Object(r.__decorate)([Object(o.Injectable)()],i);let n=class PersonsList{constructor(e,t){this.personSrvc=e,this.router=t,this.data=[],this.persondetails={},console.log("current route ",this.router.getCurrentRoute())}mount(){this.personSrvc.getPersons().then(e=>{this.data=e,this.update()})}alertName(e){this.persondetails=e,this.update()}render(){return o.html`
			<h4>Sample service injection with http call and passing data to other component</h4>
			Current route data: <code>${JSON.stringify(this.router.getCurrentRoute(),null,2)}</code>
			<div>
				<ul class="list-group">
					${this.data.map(e=>o.html`
								<li class="list-group-item"
									onclick=${()=>{this.alertName(e)}}
								>
									${e.name}
								</li>
							`)}
				</ul>
				<person-details
					id="person-details"
					userDetails=${this.persondetails}
				></person-details>
			</div>
		`}};n=Object(r.__decorate)([Object(o.Component)({selector:"persons-list",styleUrl:"persons/persons-list.scss"}),Object(r.__metadata)("design:paramtypes",[i,o.Router])],n);let a=class PersonDetails{constructor(){this.userDetails={}}render(){return console.log("selected: user",this.userDetails),this.userDetails.name?o.html`
				<strong>Person Details</strong>
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>
			`:o.html`<div></div>`}};Object(r.__decorate)([Object(o.Input)(),Object(r.__metadata)("design:type",Object)],a.prototype,"userDetails",void 0),a=Object(r.__decorate)([Object(o.Component)({selector:"person-details"})],a)}}]);