import { isArray } from "./utils";
import { registerElement } from "./registerElement";
import { registerService } from "./service_resolver";
import 'reflect-metadata'
const getDeps = (target: any) => {
  let types = Reflect.getMetadata("design:paramtypes", target) || [];
  let deps = types.map((a: any) => {
    if (a) {
      if (a.name !== "Object") {
        return a.name;
      } else {
        return "props";
      }
    } else {
      return "";
    }
  });
  return deps;
};

const Component = (options: DecoratorOptions) => (target: any) => {
  if (options.name.indexOf("-") <= 0) {
    throw new Error("You need at least 1 dash in the custom element name!");
  }
  let s = getDeps(target);
  console.log(`Component param types: ${s}`);
  registerElement(options, target, s);
};

const Service = (options: DecoratorOptions) => {
  return (target: Function) => {
    let s = getDeps(target);
    console.log(`Service param types: ${s}`);
    registerService(options.name, target, s);
  };
};

const logType = () => {
  return (target: any, key: string) => {
    var t = Reflect.getMetadata("design:type", target, key);
    console.log(`from logType: ${key} type: ${t.name}`);
  }
}

const logParamTypes = () => (target: any) => {
  var types = Reflect.getMetadata("design:paramtypes", target);
  var s = types.map(a => a.name).join();
  console.log(`logParamTypes param types: ${s}`);
}

export { Component, Service, logType, logParamTypes }