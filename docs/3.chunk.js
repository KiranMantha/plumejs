(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{42:function(e,t,s){"use strict";s.r(t);var r=s(0),i=s(1);let o=class PersonService{getPersons(){return fetch("https://jsonplaceholder.typicode.com/users").then(e=>e.json())}};o=Object(r.__decorate)([Object(i.Injectable)()],o);let a=class PersonsList{constructor(e,t){this.personSrvc=e,this.router=t,this.data=[],this.persondetails={},console.log("current route ",this.router.getCurrentRoute())}mount(){this.personSrvc.getPersons().then(e=>{this.data=e,this.update()})}alertName(e){this.persondetails=e,this.update()}render(){return i.html`
		<h4>Sample service injection with http call and passing data to other component</h4>
		<div innerHTML='${"10300".translate("fr")}'></div>		
			<div>
				<ul class="list-group">
					${this.data.map(e=>i.html`
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
		`}};a=Object(r.__decorate)([Object(i.Component)({selector:"persons-list",styleUrl:"persons/persons-list.scss"}),Object(r.__metadata)("design:paramtypes",[o,i.Router])],a);let n=class PersonDetails{constructor(){this.userDetails={}}render(){return console.log("selected: user",this.userDetails),this.userDetails.name?i.html`
				<div>Name: ${this.userDetails.name}</div>
				<div>Company: ${this.userDetails.company.name}</div>
			`:i.html`<div></div>`}};Object(r.__decorate)([Object(i.Input)(),Object(r.__metadata)("design:type",Object)],n.prototype,"userDetails",void 0),n=Object(r.__decorate)([Object(i.Component)({selector:"person-details"})],n)}}]);