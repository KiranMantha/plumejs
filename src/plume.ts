//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
import { getService } from "./lib/service_resolver";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { Component, Service } from "./lib/decorators";
import { html } from 'lighterhtml-plus';

'use strict';
export { Component, Service, html, getService };
