//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
"use strict";
import { Injector } from "./lib/service_resolver";
import { Component, Injectable, Input } from "./lib/decorators";
import { Router } from "./lib/routerService";
import { TranslationService } from "./lib/translationService";
import { DecoratorOptions, Route, Ref } from "./lib/types";
import { html } from "lighterhtml-plus";
import { useRef } from "augmentor";
import { DomTransition } from "./lib/domTransition.service";
export {
  Component,
  Injectable,
  html,
  Injector,
  Input,
  Router,
  TranslationService,
  DomTransition,
  DecoratorOptions,
  Route,
  useRef,
  Ref
};
