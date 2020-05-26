//https://github.com/ibhi/webcomponent-with-di/blob/master/src/users.component.js
//https://medium.com/@gilfink/creating-a-custom-element-decorator-using-typescript-302e7ed3a3d1
"use strict";
import { Injector } from "./lib/service_resolver";
import { Component, Injectable, Input } from "./lib/decorators";
import { DecoratorOptions, Route, Ref, IHooks } from "./lib/types";
import { html } from "lighterhtml";
import { useRef, useState, useContext } from "augmentor";
import { Router } from "./lib/routerService";
import { DomTransition } from "./lib/domTransition.service";
import { TranslationService } from "./lib/translationService";
import { useFormFields } from './lib/hooks';
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
  IHooks,
  useRef,
  Ref,
  useState,
  useContext,
  useFormFields
};
