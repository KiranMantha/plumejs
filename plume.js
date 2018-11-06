//https://github.com/Andarist/nanoclone-comparisons/blob/master/webpack.config.js
import './lib/replacewith-polyfill.js';
import twdb from './lib/two-way-data-bind.js';
import valOf from './lib/val.js';
import router from './lib/router.js';
import ready from './lib/mo.js';

var plume = (function () {
  'use strict';
  var services = {},
  controllers = {},
    returnObject = {},
    _router;

  function ajaxHtmlLoad(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
      if (xhr.status === 200) {
        cb && cb(xhr.responseText);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  };

  //indexof for arrays, nodelist
  function indexof(collection, item) {
    if (Object.prototype.toString.call(collection) === "[object Array]") {
      return collection.indexOf(item);
    } else {
      return Array.prototype.indexOf.call(collection, item);
    }
  };

  //foreach for arrays, collections, objects
  function foreach(collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0; i < collection.length; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  function get(obj, path) {
    var value, patharr, k;
    if (path) {
      if (!isNaN(parseInt(path))) {
        return path;
      }
      patharr = path.trim().split(".");
      if (obj) {
        for (var i = 0; i < patharr.length; i++) {
          k = k ? k[patharr[i]] : obj[patharr[i]];
          if (k && typeof k !== "object") {
            value = k;
            return value;
          }
        }
        value = k;
        if (typeof value === "undefined") {
          if (typeof defaultValue !== "undefined") value = defaultValue;
          else value = "";
        }
      }
    }
    return value;
  };

  function $args(func) {
    return Function.toString
      .call(func)
      .replace(/[/][/].*$/gm, "") // strip single-line comments
      .replace(/\s+/g, "") // strip white space
      .replace(/[/][*][^/*]*[*][/]/g, "") // strip multi-line comments
      .split("){", 1)[0]
      .replace(/^[^(]*[(]/, "") // extract the parameters
      .replace(/=[^,]+/g, "") // strip any ES6 defaults
      .split(",")
      .filter(Boolean); // split & filter [""]
  }

  function setDI(func) {
    var di = [],
      finalArr = [],
      func = func instanceof Array ? func : [func],
      afunc = func[func.length - 1],
      args = $args(afunc);
    if (args.length > 0) {
      foreach(args, function (o, i) {
        var srvc = func[i];
        if (typeof srvc === 'string' && services[srvc]) {
          var k = services[srvc];
          di.push(k);
        }
      });
    }
    finalArr = [afunc, di];
    return finalArr;
  }

  function _render(sel, obj) {
    var isExpression = /{{(.+?)}}/g,
      isFuncWithArgs = /\(\s*([^)]+?)\s*\)/,
      getFuncName = /^\s*[A-Za-z][A-Za-z0-9_]*([^\(]*)/i,
      teTags = ["select"],
      html,
      scope = {
        if: {},
        for: {}
      },
      inputElems = ["input", "select"],
      _twdb = new twdb();

    var parseHtml = function (tmpl) {
      var template, dom;
      template = document.createElement("div");
      template.innerHTML = tmpl;
      dom = template.children;
      if (dom.length > 1) {
        throw Error("template", "Template should contain one root element");
      }
      if (dom.length === 0) {
        throw Error("template", "Template should not be empty");
      }

      foreach(dom[0].querySelectorAll("[if-value]"), function (node) {
        foreach(node.querySelectorAll("[item][loop]"), function (el) {
          el.setAttribute("hasparentif", true);
        });
      });

      return dom[0];
    };

    var mapProp = function (pel, el, key, value, ctx, localCtx) {
      var regError = function () {
        if (el.children.length > 1) {
          throw Error(
            el.nodeName.toLowerCase() + " tag",
            "Should contain only one root element."
          );
        }
        if (el.children.length === 0) {
          throw Error(
            el.nodeName.toLowerCase() + " tag",
            "Should contain one root element and should not contain text"
          );
        }
      };

      var parseFor = function () {
        var _val = el.getAttribute("item"),
          _loop = el.getAttribute("loop"),
          loop = get(ctx, _loop),
          ihtml = el.children[0],
          cnel = document.importNode(el, true),
          indx;
        if (loop && _val) {
          indx = indexof(pel.childNodes, el);
          foreach(loop, function (item) {
            var k = {},
              cn = (key === "select") ? el.children[0].cloneNode(true) : el.cloneNode(true);
            k[_val] = item;
            if (key === "select") {
              el.appendChild(cn);
            } else {
              cn.setAttribute("te_forcontent", _loop + indx);
              cn.removeAttribute("item");
              cn.removeAttribute("loop");
              pel.appendChild(cn);
            }
            bindCtx(pel, cn, ctx, k);
          });
          if (key === "select") {
            el.removeChild(ihtml);
            el.removeAttribute("item");
            el.removeAttribute("loop");
          }
        }
        if (!scope.for[_loop]) {
          scope.for[_loop] = [];
        }
        scope.for[_loop].push({
          contentId: indx,
          pel: pel,
          el: cnel,
          ihtml: cnel,
          key: key,
          value: value,
          objProp: _loop,
          objPropValue: loop
        });
      };

      var parseIf = function () {
        regError();
        var props = [],
          propvalues = [],
          _val = el.getAttribute("if-value"),
          ihtml = el.children[0],
          cnel = document.importNode(el, true),
          indx,
          condition,
          type,
          func,
          evalExpr;

        if (_val) {
          indx = indexof(pel.childNodes, el);
          condition = _val.split(" ");
          type = "" + condition[1];
          func = null;
          evalExpr = false;

          if (condition[1]) {
            func = new Function("a", "b", "return a " + condition[1] + " b");
          }

          if (func) {
            evalExpr = func(get(ctx, condition[0]), get(ctx, condition[2]));
            props.push(condition[0].split(".")[0]);
            props.push(condition[2].split(".")[0]);
            propvalues.push(get(ctx, props[0]));
            propvalues.push(get(ctx, props[1]));
          } else {
            type = condition[0][0] != "!";
            condition[0] = type ? condition[0] : condition[0].substr(1);
            evalExpr = !!(get(ctx, condition[0]) || get(localCtx, condition[0])) == type;
            props.push(condition[0].split(".")[0]);
            propvalues.push(get(ctx, props[0]));
          }

          if (evalExpr) {
            bindCtx(pel, el.children[0], ctx, localCtx);
            el.removeAttribute("if-value");
          } else {
            var tn = document.createTextNode("");
            el.replaceWith(tn);
          }

          for (var i = 0; i < props.length; i++) {
            if (isNaN(props[i])) {
              if (!scope.if[props[i]]) {
                scope.if[props[i]] = [];
              }
              scope.if[props[i]].push({
                contentId: indx,
                pel: pel,
                el: cnel,
                ihtml: ihtml,
                key: key,
                value: value,
                objProp: props[i],
                objPropValue: propvalues[i]
              });
            }
          }
        }
      };

      var eventHandler = function () {
        var match,
          funcName = getFuncName.exec(value)[0],
          prevFunc = el["on" + key],
          args,
          values,
          val;
        if ((match = isFuncWithArgs.exec(value))) {
          args = match[1].split(",");
          values = [];
          for (var i = 0; i < args.length; i++) {
            val = get(localCtx, args[i]) || get(ctx, args[i]);
            val = val ? val : args[i].replace(/['"]+/g, '');
            values.push(val);
          }
          el["on" + key] = function () {
            get(ctx, funcName).apply(ctx, values);
            prevFunc && prevFunc();
          };
        } else {
          el["on" + key] = function () {
            get(ctx, funcName).apply(ctx);
            prevFunc && prevFunc();
          };
        }
        el["te" + key] = el["on" + key];
        el.removeAttribute(key);
      };

      var map = {
        for: parseFor,
        if: parseIf,
        select: parseFor,
        click: eventHandler,
        change: eventHandler,
        input: eventHandler,
        keypress: eventHandler,
        keyup: eventHandler,
        keydown: eventHandler,
        submit: eventHandler,
        value: function () {
          var match, val;
          while (
            (match = isExpression.exec(value.replace(/[\s\r\n]/g, "").trim()))
          ) {
            val = get(localCtx, match[1].trim()) || get(ctx, match[1].trim());
            el["value"] = val;
          }
        },
        bind: function () {
          var v = get(ctx, value) || get(localCtx, value);
          valOf([el], v);
        },
        default: function () {
          return;
        }
      };

      return (map[key] || map["default"])();
    };

    var bindText = function (pel, el, ctx, localCtx) {
      var match,
        node_val = el.nodeValue.replace(/[\s\r\n]/g, "").trim(),
        val;
      if (node_val !== "") {
        while ((match = isExpression.exec(node_val))) {
          val = get(localCtx, match[1].trim()) || get(ctx, match[1].trim());
          el.nodeValue = node_val.replace(match.input, val);
          if (pel.nodeName.toLowerCase() !== "option") {
            pel.setAttribute("bind", match[1].trim());
            pel.setAttribute("te_index", indexof(pel.childNodes, el));
          }
        }
      }
    };

    var bindAttributes = function (pel, el, ctx, localCtx) {
      if (el.attributes.length > 0) {
        var _attrs = el.attributes;
        for (var i = 0; i < _attrs.length; i++) {
          if (
            _attrs[i].specified && ["class", "style"].indexOf(_attrs[i].name) < 0
          ) {
            mapProp(pel, el, _attrs[i].name, _attrs[i].value, ctx, localCtx);
          }
        }
      }
    };

    var bindCtx = function (pel, el, _ctx, _localCtx) {
      var tagName;
      if (el.nodeType === 3) {
        bindText(pel, el, _ctx, _localCtx);
      } else {
        //handle custom te nodes seperately
        tagName = el.nodeName.toLowerCase();
        if (teTags.indexOf(tagName) > -1) {
          mapProp(pel, el, tagName, true, _ctx, _localCtx);
          if (tagName !== "select") {
            pel.removeChild(el);
          } else {
            bindAttributes(pel, el, _ctx, _localCtx);
          }
        } else {
          //check rest of the attributes
          if (el.getAttribute("if-value")) {
            mapProp(pel, el, "if", true, _ctx, _localCtx);
          } else if (el.getAttribute("item") && el.getAttribute("loop")) {
            mapProp(pel, el, "for", true, _ctx, _localCtx);
            pel.removeChild(el);
          } else {
            bindAttributes(pel, el, _ctx, _localCtx);
            foreach(el.childNodes, function (node) {
              bindCtx(el, node, _ctx, _localCtx);
            });
          }
        }
      }
    };

    var setTwbd = function (mappedObj) {
      foreach(html.querySelectorAll("[bind]"), function (node) {
        var bindProp = node.getAttribute("bind");
        if (inputElems.indexOf(node.nodeName.toLowerCase()) > -1) {
          _twdb.bind(node, mappedObj, bindProp, true);
        } else {
          _twdb.bind(node, mappedObj, bindProp);
        }
      });
    };

    var rebind = function (ctx, key, val) {
      var rerendereed = {};
      if (scope.if[key] && scope.if[key].length > 0) {
        foreach(scope.if[key], function (obj) {
          rerendereed[key] = false;
          if (obj.objPropValue !== val) {
            rerendereed[key] = true;
            obj.pel.childNodes[obj.contentId].replaceWith(obj.el);
            bindCtx(obj.pel, obj.el, ctx, {});
          }
        });
      }
      if (scope.for[key] && scope.for[key].length > 0 && !rerendereed[key]) {
        foreach(scope.for[key], function (obj) {
          if (obj.objPropValue !== val) {
            obj.pel.childNodes[obj.contentId].replaceWith(obj.el);
            if (obj.el.nodeName.toLowerCase() !== "select") {
              obj.pel.querySelectorAll(
                '[te_forcontent="' + (key + obj.contentId) + '"]'
              );
            }
            bindCtx(obj.pel, obj.el, ctx, {});
          }
        });
      }
    };

    var diff = function (obj1, obj2) {
      var _diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
          result.push(key);
        } else if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
          var resultKeyIndex = result.indexOf(key);
          result.splice(resultKeyIndex, 1);
        }
        return result;
      }, Object.keys(obj2));

      return _diff;
    };

    var buildContext = function() {
      
    }

    var compile = function (el) {
      var mappedObj = {
          updateCtx: function () {
            var _diff = diff(oldref, this);
            if (_diff.length > 0) {
              for (var i of _diff) {
                rebind(this, i, this[i]);
              }
              setTwbd(this);
              oldref = Object.assign({}, this);
            }
          }
        },
        oldref,
        deps = setDI(obj.controller);

      if (deps[1].length > 0) {
        deps[0].apply(mappedObj, deps[1]);
      } else {
        deps[0].call(mappedObj);
      }

      bindCtx(null, html, mappedObj);
      if (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.appendChild(html);
      mappedObj.init && mappedObj.init();
      setTwbd(mappedObj);
      oldref = Object.assign({}, mappedObj);
    };

    this.render = function () {
      if (obj.template || obj.templateUrl) {
        ready(sel, function (el) {
          if (obj.template) {
            html = parseHtml(obj.template);
            html && compile(el);
          } else if (obj.templateUrl) {
            ajaxHtmlLoad(obj.templateUrl, function (h) {
              html = parseHtml(h);
              html && compile(el);
            });
          }
        });
      } else {
        throw Error("Required either template or templateUrl");
      }
    };
  }

  _router = router(ajaxHtmlLoad);

  returnObject = Object.freeze({
    render: function (el, obj) {
      return new _render(el, obj).render();
    },
    factory: function (name, func) {
      if (name && func && !services[name]) {
        var deps = setDI(func),
          obj = deps[1].length > 0 ? deps[0].apply({}, deps[1]) : deps[0]();
        Object.defineProperty(services, name, {
          value: obj,
          configurable: false,
          enumerable: false,
          writable: false
        });
      }
    },
    router: _router,
    get: function(name) {
      return services[name] || controllers[name] || undefined;
    }
  });

  window["plume"] = returnObject;

  return returnObject;
})();

export default plume;