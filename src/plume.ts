//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
'use strict';
import { Injector } from "./lib/service_resolver";
import { Component, Injectable, Input } from "./lib/decorators";
import { Router } from "./lib/routerService";
import { DecoratorOptions, Route, Ref } from './lib/types';
import './lib/router';
import { html } from 'lighterhtml-plus';
import { useRef } from 'augmentor';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
export { Component, Injectable, html, Injector, Input, Router, DecoratorOptions, Route, useRef, Ref }
