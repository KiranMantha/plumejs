/*! (c) Andrea Giammarchi (ISC) */ ! function (t, e) {
  "use strict";

  function n(t) {
    return t.head || t.getElementsByTagName("head")[0]
  }

  function i(t, e) {
    return {
      get: function () {
        return t()[e]
      },
      set: function (n) {
        t()[e] = n
      }
    }
  }

  function o(t, e, n) {
    var i = e.offsetWidth,
      o = e.offsetHeight;
    this.width !== i && (t.width = (this.width = i) + "px"), this.height !== o && (t.height = (this.height = o) + "px"), n()
  }

  function a() {
    for (var t = 0, e = this.length; t < e; t++) {
      var n = this[t].textContent;
      /:host/.test(n) && (this[t].textContent = n.replace(/:host/g, "body"))
    }
  }

  function r() {
    return "#shadow-root:" + m++ + "." + Math.random() * new Date
  }

  function s(t) {
    function e() {
      clearTimeout(i), i = setTimeout(n)
    }

    function n() {
      i = 0, t()
    }
    var i = 0;
    this.observe = function (t) {
      t[d]("DOMSubtreeModified", e)
    }
  }

  function c(t, c) {
    function m() {
      var n = v.documentElement;
      N.attachShadow = e.attachShadow, N[d] = function (e, i, o) {
        var a = this,
          r = a[T] || (a[T] = {
            s: [],
            d: []
          }),
          s = r.s.indexOf(i);
        s < 0 && (s = r.s.push(i) - 1, r.d[s] = function (e) {
          if (a.contains(e.target)) {
            var n = t.ownerDocument.createEvent("Event");
            n.initEvent(e.type, e.bubbles, e.cancelable);
            for (var i in e) try {
              n[i] = e[i]
            } catch (o) {}
            t.parentNode[u](n)
          }
        }, M.call(a, e, i, o), M.call(n, e, r.d[s], o))
      }, N[h] = function (t, e, i) {
        var o = this[T],
          a = o ? o.s.indexOf(e) : -1;
        a > -1 && (S.call(this, t, e, i), S.call(n, t, o.d[a], i), o.s.splice(a, 1), o.d.splice(a, 1))
      };
      for (var i, o = 0; o < D.length; o++) i = D[o], N[i[0]].apply(i[1], i[2])
    }

    function b() {
      console.log('t', t);
      v = t.contentDocument, n(v).appendChild(v.createElement("style")).textContent = "html,body{" + l + "}*{margin:0}" + f, m();
      var e;
      if (g !== v.body) {
        for (; e = g.firstChild;) v.body.appendChild(e);
        g = v.body
      }
      var i = o.bind({
        width: 0,
        height: 0
      }, t.style, g, a.bind(g.getElementsByTagName("style")));
      new w(i).observe(g, {
        childList: !0,
        attributes: !0,
        subtree: !0
      }), i()
    }
    var p = {
        mode: {
          value: c.mode
        }
      },
      v = t.contentDocument,
      y = t.contentWindow,
      w = y.MutationObserver || s,
      g = v.body || v.createElement("body"),
      E = v.createDocumentFragment(),
      x = function () {
        return g
      };
    for (var C in E)
      if ("function" == typeof E[C] && C in g) p[C] = {
        value: g[C].bind(g)
      };
      else switch (C) {
        case "nodeName":
        case "nodeType":
        case "tagName":
          p[C] = i(function () {
            return E
          }, C);
          break;
        case "activeElement":
          p[C] = i(function () {
            return v
          }, C);
          break;
        default:
          p[C] = i(x, C)
      }
    p.innerHTML = i(x, "innerHTML"), p.textContent = i(x, "textContent"), Object.defineProperties(this, p);
    var T = r(),
      D = [],
      N = (y.Element || y.Node).prototype,
      M = N[d],
      S = N[h];
    "complete" != v.readyState ? (t.onload = b, N[d] = function () {
      D.push([d, this, arguments])
    }, N[h] = function () {
      D.push([h, this, arguments])
    }, N[u] = function () {
      D.push([u, this, arguments])
    }) : b()
  } /*! (c) Andrea Giammarchi - @WebReflection (ISC) */
  if (!("attachShadow" in e)) {
    var d = "addEventListener",
      h = "removeEventListener",
      u = "dispatchEvent",
      l = ["display:inline-block", "box-sizing:border-box", "margin:0", "padding:0", "background:transparent", "visibility:visible", "width:100%", "height:auto"].join(";"),
      f = "*[data-attachshadow]{padding:0 !important}",
      m = 0;
    n(document).insertBefore(document.createElement("style"), n(document).firstChild).textContent = f, e.attachShadow = function (t) {
      var e = this.ownerDocument.createElement("iframe");
      this.setAttribute("data-attachshadow", ""), e.setAttribute("scrolling", "no"), e.setAttribute("allowtransparency", "yes"), e.setAttribute("allowfullscreen", "yes"), e.setAttribute("frameborder", "0"), e.style.cssText = l;
      var n = new c(this.appendChild(e), t);
      return "open" === t.mode && (this.shadowRoot = n), n
    }
  }
}(0, (window.Element || window.Node).prototype);