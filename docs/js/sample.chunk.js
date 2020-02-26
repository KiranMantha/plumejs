(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{31:function(t,e,s){"use strict";s.r(e);var o=s(0),n=s(8);let c=class{constructor(){}testMeth(){console.log("testmethod in sample service")}};c=Object(o.a)([Object(n.b)(),Object(o.c)("design:paramtypes",[])],c);let p=class{constructor(t){this.sampleSrvc=t}testMeth(){this.sampleSrvc.testMeth()}getUsers(){return fetch("https://api.github.com/users?since=135")}};p=Object(o.a)([Object(n.b)(),Object(o.c)("design:paramtypes",[c])],p);let i=class{constructor(){this.testprops={}}render(){return n.f`
			<div>
				testing web component2 ${this.testprops.name}
				<button onclick=${t=>this.counts(t)}>hi</button>
				<input
					value=${this.testprops.name}
					oninput=${t=>this.change(t.target.value)}
				/>
			</div>
		`}counts(t){this.testprops.oncount("testing from click")}change(t){this.testprops.oncount(t)}mount(){console.log("component loaded"),console.log("props: ",this.testprops)}unmount(){console.log("component unloaded")}};Object(o.a)([Object(n.c)(),Object(o.c)("design:type",Object)],i.prototype,"testprops",void 0),i=Object(o.a)([Object(n.a)({selector:"test-ele"})],i);let r=class{constructor(t){this.testSrvc=t,this.test="sample 123",this.outCount=this.count.bind(this),this.props={oncount:this.outCount,name:this.test}}render(){return n.f`
			<div>
				<h1>Sample two way data binding</h1>
				testing web component1 ${this.test}
				<test-ele testprops=${this.props}></test-ele>
			</div>
		`}count(t){this.test=t,this.props.name=t,this.update()}beforeMount(){console.log("before mounting...")}mount(){console.log("component loaded"),this.testSrvc.testMeth()}unmount(){console.log("component unloaded")}};r=Object(o.a)([Object(n.a)({selector:"sample-ele"}),Object(o.c)("design:paramtypes",[p])],r),e.default=r}}]);
//# sourceMappingURL=sample.chunk.js.map