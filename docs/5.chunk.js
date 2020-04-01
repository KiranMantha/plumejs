(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{42:function(t,e,s){"use strict";s.r(e);var o=s(0),n=s(1);let c=class SampleService{constructor(){}testMeth(){console.log("testmethod in sample service")}};c=Object(o.__decorate)([Object(n.Injectable)(),Object(o.__metadata)("design:paramtypes",[])],c);let i=class TestService{constructor(t){this.sampleSrvc=t}testMeth(){this.sampleSrvc.testMeth()}getUsers(){return fetch("https://api.github.com/users?since=135")}};i=Object(o.__decorate)([Object(n.Injectable)(),Object(o.__metadata)("design:paramtypes",[c])],i);let l=class TestEle{constructor(){this.testprops={}}inputChanged(t,e){console.log("oldvalue: ",t),console.log("newvalue: ",e)}render(){return n.html`
			<div>
				testing web component2 ${this.testprops.name}
				<button class='btn btn-sm btn-primary' onclick=${t=>this.counts(t)}>hi</button>
				<input
					value=${this.testprops.name}
					oninput=${t=>this.change(t.target.value)}
				/>
			</div>
		`}counts(t){this.testprops.oncount("testing from click")}change(t){this.testprops.oncount(t)}mount(){console.log("component loaded"),console.log("props: ",this.testprops)}unmount(){console.log("component unloaded")}};Object(o.__decorate)([Object(n.Input)(),Object(o.__metadata)("design:type",Object)],l.prototype,"testprops",void 0),l=Object(o.__decorate)([Object(n.Component)({selector:"test-ele"})],l);let a=class SampleEle{constructor(t){this.testSrvc=t,this.inputField=Object(n.useRef)(null),this.test="sample 123",this.outCount=this.count.bind(this),this.props={oncount:this.outCount,name:this.test}}enablePersonsRoute(){window.localStorage.setItem("plumejs","now persons route is activated")}disablePersonsRoute(){window.localStorage.removeItem("plumejs")}render(){return n.html`
			<p>Persons route has <b>canActivate</b> gaurd which check for <i>plumejs</i> key in localstorage. Click enable button to navigate to persons route. Click disable button to disable persons route. </p>
			<div>
				<button class='btn btn-sm btn-primary' onclick=${this.enablePersonsRoute} title='click persons nav to check persons route'>Enable Persons route</button>
				<button class='btn btn-sm btn-primary' style='margin-left: 10px' onclick=${this.disablePersonsRoute} title='click persons nav to check persons route'>Disable Persons route</button>
			</div>
			<div>${"username.greet".translate({name:"test user"})}</div>
			<input type='text' ref=${this.inputField} /><button class='btn btn-sm btn-primary' onclick=${()=>{this.getRef()}}>click</button>
			<div>
				<h1>Sample two way data binding</h1>
				testing web component1 ${this.test}
				<test-ele testprops=${this.props}></test-ele>
			</div>
		`}count(t){this.test=t,this.props.name=t,this.update()}beforeMount(){console.log("before mounting...")}mount(){console.log("component loaded"),console.log(this.inputField),this.testSrvc.testMeth()}unmount(){console.log("component unloaded")}getRef(){console.log(this.inputField)}};a=Object(o.__decorate)([Object(n.Component)({selector:"sample-ele"}),Object(o.__metadata)("design:paramtypes",[i])],a)}}]);