import { Injector } from "./lib/service_resolver";
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { Component, Injectable, Input } from "./lib/decorators";
import { html } from 'lighterhtml-plus';
import { Router } from "./lib/routerService";
import { DecoratorOptions, Route } from './lib/types';
import './lib/router';
export { Component, Injectable, html, Injector, Input, Router, DecoratorOptions, Route };
