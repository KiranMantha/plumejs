(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{45:function(e,t,o){"use strict";o.r(t);var l=o(0),s=o(1),n=o(8);let i=class NestedModal{constructor(e){this.modalsrvc=e,this.nestedModalData={}}openAnotherModal(){const e=this.modalsrvc.show({renderTemplate:()=>s.html`<div>i'm nested modal</div>`,modalTitle:"nested modal",modalClass:"nested-class"});e.onOpen.subscribe(()=>{console.log("nested modal open")}),e.onClose.subscribe(()=>{console.log("nested modal closed")})}render(){return s.html`
			<div>sample modal</div>
			<div>${this.nestedModalData.message}</div>
			<button
				class="button is-small is-info"
				onclick=${()=>{this.openAnotherModal()}}
			>
				open another modal
			</button>
		`}};Object(l.__decorate)([Object(s.Input)(),Object(l.__metadata)("design:type",Object)],i.prototype,"nestedModalData",void 0),i=Object(l.__decorate)([Object(s.Component)({selector:"nested-modal"}),Object(l.__metadata)("design:paramtypes",[n.ModalService])],i);let a=class PlumeComponents{constructor(e,t){this.modalsrvc=e,this.notifySrvc=t,this.toggleInput={onchange:this.onToggleChange.bind(this),onText:"ON",offText:"OFF"},this.multiselectToggles={enableMultiselect:{onchange:e=>{this.multiSelectOptions.multiple=e,this.multiSelectOptions.resetWidget=!0,this.update()}},disableDropdown:{onchange:e=>{this.multiSelectOptions.disableDropdown=e,this.update()}}},this.multiSelectOptions={data:[{name:"option1"},{name:"option2"},{name:"option3"},{name:"option4"},{name:"option5"}],displayField:"name",multiple:!1,enableFilter:!0,disableDropdown:!1,buttonText:e=>0===e.length?"None selected":e.length>3?e.length+" selected":e.map(e=>e.name).join(", "),onchange:e=>{console.log(e)}}}openModal(){const e=this.modalsrvc.show({renderTemplate:()=>s.html`<nested-modal nestedModalData=${{message:"Hello World"}}></nested-modal>`,modalTitle:"testing modal",modalClass:"sample-class"});e.onOpen.subscribe(()=>{console.log("main modal open",e.Id)}),e.onClose.subscribe(()=>{console.log("main modal closed")})}notify(){this.notifySrvc.sendMessage("hello world",n.NotificationType.Info)}onToggleChange(e){console.log(e)}render(){return s.html`
					<div>
						<h2 class='mb-20'>Plumejs UI Control Collection</h2>
						<div class='mb-20'>
							<h5>Modal</h5>
							<button
								class="button is-small is-info"
								onclick=${()=>{this.openModal()}}
							>
								Open Modal
							</button>
						</div>
						<div class='mb-20'>
							<h5>Notification</h5>
							<button class='button is-small is-info' onclick=${()=>{this.notify()}}>Notify</button>
						</div>
						<div class='mb-20'>
							<h5>Toggle Button</h5>
							<toggle-button toggleOptions=${this.toggleInput}></toggle-button>
						</div>
						<div class='mb-20'>
							<h5>Multi select</h5>
							<div style='width: 500px'>
								<div class='d-flex mb-20'>
									<span>enable multi select</span> <toggle-button toggleOptions=${this.multiselectToggles.enableMultiselect}></toggle-button>
								</div>
								<div class='d-flex mb-20'>
									<span>disable dropdown</span> <toggle-button toggleOptions=${this.multiselectToggles.disableDropdown}></toggle-button>
								</div>
							</div>
							<div style='width: 300px'>
								<multi-select multiSelectOptions=${this.multiSelectOptions}></multi-select>
							</div>
						</div>
					</div>
			`}};a=Object(l.__decorate)([Object(s.Component)({selector:"plume-comp"}),Object(l.__metadata)("design:paramtypes",[n.ModalService,n.NotificationService])],a)}}]);