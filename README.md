[![GitHub contributors](https://img.shields.io/github/contributors/kiranmantha/plumejs)](https://GitHub.com/KiranMantha/plumejs/graphs/contributors/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://GitHub.com/KiranMantha/plumejs/pulls)

[![npm](https://img.shields.io/npm/dw/@plumejs/core)](https://www.npmjs.com/package/@plumejs/core) [![npm](https://img.shields.io/npm/v/@plumejs/core)](https://www.npmjs.com/package/@plumejs/core)

![](./logo.svg)

Demo [here](https://kiranmantha.github.io/plumejs-example-repo/). Check console logs for further details.

Example [repo](https://github.com/KiranMantha/plumejs-example-repo/)

Intro for dual packages [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)

PlumeJs is a very light weight typescript framework to build spa's. It is build on more accessable web components, typescript. It comes with features like change detection during async operations, data-sharing via services and props, dependency injection.

PlumeJs is a conceptual combination of angularjs and react. Just like angular one can register `Services`, `Components` and `life-cycle hooks`. It has `setProps` and `onbindprops` for passing data from one component to another and like react `update` function to update the view after modal updations and a `render` function to render the component.

PlumeJs has very few syntaxes enabling faster learning curve.

To start with PlumeJs

# Yo Plumejs

Plumejs has yeoman generator which provides the entire scaffolding for your project. To start with:

1. Require Nodejs version 11.0.0 or above
2. Run `npm install -g yo generator-plumejs`
3. After completing installation run `yo plumejs` in your destination folder. This will ask you about your project name, description and type of bundler for your project. After that it will install all the required dependencies.
4. After all the dependencies were installed, you can run application using command `npm start`.

# Starter templates

If you don't want to start with `yo plumejs` and need to use either with webpack or vite specifically then please check

1. [PlumeJS webpack template](https://github.com/KiranMantha/plumejs-webpack-template)
2. [PlumeJS vite template](https://github.com/KiranMantha/plumejs-vite-template)

# Documentation

For documentation please visit [wiki](https://github.com/KiranMantha/plumejs/wiki)

# Credits:

1. dom-diffing: https://gomakethings.com/dom-diffing-with-vanilla-js/
2. template literals: https://medium.com/@trukrs/tagged-template-literal-for-html-templates-4820cf5538f9
3. dom traversal: https://www.programmersought.com/article/9331587598/
4. uhtml: https://github.com/WebReflection/uhtml
5. template.js: https://github.com/Mevrael/html-template/blob/master/template.js
6. proposals for <template> tag: https://github.com/whatwg/html/issues/2254
7. styling shadow dom using parts: https://css-tricks.com/styling-in-the-shadow-dom-with-css-shadow-parts/
