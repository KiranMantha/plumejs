//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';
import { Injector } from "./lib/service_resolver";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { Component, Injectable, Input } from "./lib/decorators";
import { html } from 'lighterhtml-plus';
import { Router } from "./lib/routerService";
import { DecoratorOptions, Route } from './lib/types';
import './lib/router';
export { Component, Injectable, html, Injector, Input, Router, DecoratorOptions, Route }
