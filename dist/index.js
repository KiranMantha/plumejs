var q = Object.defineProperty;
var K = (e, t, o) => t in e ? q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var h = (e, t, o) => K(e, typeof t != "symbol" ? t + "" : t, o);
const $ = (e) => typeof e == "function", Q = (e) => !!e && typeof e.subscribe == "function", F = (e) => !!e && typeof e.then == "function", B = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch (e) {
    return console.warn("CSSStyleSheet not supported", e), !1;
  }
})(), Y = (e) => ({
  subscribe: (t) => {
    t(e);
  }
}), G = (e) => ({
  subscribe: (t) => {
    Promise.resolve(e).then((o) => {
      t(o);
    });
  }
}), R = () => Math.random().toString(36).substring(2);
class X {
  constructor() {
    h(this, "_callbackCollection", {});
  }
  unsubscribe(t) {
    delete this._callbackCollection[t];
  }
  asObservable() {
    return {
      subscribe: (t) => this.subscribe(t)
    };
  }
  subscribe(t) {
    const o = R();
    return this._callbackCollection[o] = t, () => this.unsubscribe(o);
  }
  next(t) {
    for (const o in this._callbackCollection)
      this._callbackCollection[o](t);
  }
}
class le extends X {
  constructor(o) {
    super();
    h(this, "_initialValue");
    this._initialValue = o;
  }
  subscribe(o) {
    const i = super.subscribe(o);
    return super.next(this._initialValue), i;
  }
  next(o) {
    this._initialValue = o, super.next(o);
  }
}
class Z {
  constructor() {
    h(this, "_subcribers", []);
  }
  add(t) {
    this._subcribers.push(t);
  }
  unsubscribe() {
    for (const t of this._subcribers)
      t();
    this._subcribers = [];
  }
}
const ue = (e) => Q(e) ? e : F(e) ? G(Promise.resolve(e)) : Y(e), x = (e, t, o, i = !1) => (e.addEventListener(t, o, i), () => {
  e.removeEventListener(t, o, i);
}), V = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), o = (b) => {
    const f = b.querySelectorAll("script");
    for (const S of f)
      S.remove();
  }, i = (b, f) => {
    if (f = f.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(b) && (f.includes("javascript:") || f.includes("data:")) || b.startsWith("on")) return !0;
  }, u = (b) => {
    const f = b.attributes;
    for (const { name: S, value: k } of f)
      i(S, k) && b.removeAttribute(S);
  }, p = (b) => {
    const f = b.children;
    for (const S of f)
      u(S), p(S);
  }, m = t();
  return o(m), p(m), m.innerHTML;
}, de = () => {
  let e;
  return [new Promise((o) => {
    e = o;
  }), e];
}, O = {};
let E = null;
const ee = (e, t) => {
  const o = E;
  let i;
  E = R(), O[E] = e;
  try {
    t();
  } finally {
    i = E, E = o;
  }
  return i;
}, he = (e, t) => {
  const o = O[E];
  let i = e;
  const u = () => i;
  return u.set = (p) => {
    t && $(t) ? i = t(i, p) : i = $(p) ? p(i) : p;
    try {
      o();
    } catch (m) {
      console.trace(m);
    }
  }, u;
}, te = (e, t) => {
  const o = ee(e, t);
  return function() {
    delete O[o];
  };
}, H = new class {
  constructor() {
    h(this, "map", /* @__PURE__ */ new WeakMap());
  }
  register(e, t) {
    if (!this.map.get(e))
      this.map.set(e, t);
    else
      throw Error(`${e.name} is already registered service.`);
  }
  getService(e) {
    const t = this.map.get(e);
    if (t)
      return t;
    throw Error(`${e.name} is not a registered provider.`);
  }
  removeService(e) {
    this.map.delete(e);
  }
  clear() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
}(), W = (e, t, o) => {
  if (t.length) {
    const i = [];
    for (const u of t)
      u.__metadata__.name !== "RENDERER" ? i.push(H.getService(u)) : i.push(o);
    return new e(...i);
  } else
    return new e();
}, _ = new class {
  constructor() {
    h(this, "globalStyles");
    h(this, "style_registry");
    h(this, "isRootNodeSet");
    h(this, "globalStyleTag");
    h(this, "getComputedCss", (e = "", t) => {
      let o = [];
      const i = new CSSStyleSheet();
      if (i.insertRule(":host { display: block; }"), o = t ? [i] : [this.globalStyles, i], e) {
        const u = new CSSStyleSheet();
        u.replace(e), o.push(u);
      }
      return o;
    });
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch (e) {
      console.warn(e), this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
}(), { html: fe, render: se } = /* @__PURE__ */ (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, o = "attr", i = /^attr([^ ]+)/, u = "insertNode", p = /^insertNode([^ ]+)/;
  let m = [], b = [];
  const f = (s) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let r = JSON.stringify(s);
    const c = (a) => n[a] || a;
    return r = ((a) => a.replace(/[&<>()]/g, c))(r), JSON.parse(r);
  }, S = (s, n) => {
    const r = s.options, c = Array.isArray(n) ? n : [n];
    let d, a, l = r.length;
    for (; l--; ) {
      a = r[l];
      const y = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = c.indexOf(y) > -1) && (d = !0);
    }
    d || (s.selectedIndex = -1);
  }, k = (s) => {
    const n = document.createElement("template");
    return n.innerHTML = s, n.content;
  }, N = (s, n, r) => {
    const c = () => {
      setTimeout(() => {
        if (s.isConnected) {
          const d = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          s.dispatchEvent(d);
        }
      });
    };
    s[r] = n ? JSON.stringify(n) : "", b.push(c);
  }, L = (s, n, r) => {
    switch (!0) {
      case /attrs/.test(n): {
        const c = r.attrs;
        for (const d in c)
          L(s, d, c[d]);
        break;
      }
      case /^on+/.test(n): {
        const c = n.slice(2).toLowerCase();
        s.removeEventListener(c, r), s.addEventListener(c, r);
        break;
      }
      case /ref/.test(n): {
        const c = /* @__PURE__ */ ((d, a) => () => {
          d.isConnected && a(d);
        })(s, r);
        m.push(c);
        break;
      }
      case /key/.test(n): {
        s[Symbol("key")] = r;
        break;
      }
      case /^data-+/.test(n):
      case /^aria-+/.test(n): {
        n === "data-input" ? N(s, r, Symbol("input")) : s.setAttribute(n, f(r));
        break;
      }
      case /class/.test(n): {
        r ? s.classList.add(...r.split(" ")) : s.setAttribute("class", "");
        break;
      }
      case /value/.test(n): {
        s.nodeName.toLowerCase() === "select" ? S(s, r) : s.value = f(r);
        break;
      }
      case /disabled/.test(n):
      case /checked/.test(n): {
        r ? s.setAttribute(n, r) : s.removeAttribute(n);
        break;
      }
      default:
        s.setAttribute(n, f(r));
    }
  }, J = (s, n) => {
    const r = document.createTreeWalker(s, NodeFilter.SHOW_ELEMENT, null);
    let c = r.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const d = Array.from(c.attributes).filter((a) => i.test(a.nodeName));
        for (const { nodeName: a, nodeValue: l } of d) {
          const y = i.exec(a)[1];
          L(c, l, n[y]), c.removeAttribute(a);
        }
      }
      c = r.nextNode();
    }
  }, z = (s, n) => {
    const r = document.createTreeWalker(s, NodeFilter.SHOW_COMMENT, null);
    let c = r.nextNode(), d;
    for (; c; ) {
      if (d = p.exec(c.data)) {
        const a = Array.isArray(n[d[1]]) ? n[d[1]] : [n[d[1]]];
        c.replaceWith(...a), r.currentNode = s;
      }
      c = r.nextNode();
    }
  }, w = (s, n) => {
    if (!s)
      return [null, ""];
    const r = Object.getOwnPropertySymbols(s).find((d) => d.description === n), c = r ? s[r] : "";
    return [r, c];
  }, U = (s, n) => {
    if (!s || !n || s.nodeType !== 1 || n.nodeType !== 1) return;
    const r = s.attributes, c = n.attributes, d = n.getAttribute("data-preserve-attributes"), a = d && d === "true";
    for (const { name: l, value: y } of r)
      (!c[l] || c[l] !== y) && n.setAttribute(l, y);
    if (!a)
      for (const { name: l } of c)
        r[l] || n.removeAttribute(l);
    if (["input", "textarea"].includes(n.tagName.toLowerCase()) && (n.value = s.value), n.tagName.indexOf("-") > -1 && s.tagName.indexOf("-") > -1) {
      const l = w(s, "input")[1], y = w(n, "input");
      l && y[1] && l !== y[1] && N(n, JSON.parse(l), y[0]);
    }
  }, I = (s) => s.nodeType === 3 ? "text" : s.nodeType === 8 ? "comment" : s.tagName.toLowerCase(), P = (s) => s.childNodes && s.childNodes.length > 0 ? null : s.textContent, v = (s, n, r) => {
    const c = n ? Array.from(n.childNodes) : [], d = s ? Array.from(s.childNodes) : [];
    let a = c.length - d.length;
    if (a > 0)
      for (; a > 0; a--)
        c[c.length - a].parentNode.removeChild(c[c.length - a]);
    d.forEach((l, y) => {
      const g = c[y], A = w(l, "key")[1], C = w(g, "key")[1];
      if (U(l, g), r && g && g.nodeType === 1 && g.tagName.indexOf("-") > -1)
        return;
      if (!g) {
        n && n.appendChild(l);
        return;
      }
      if (A && C && A !== C || I(l) !== I(g)) {
        g.replaceWith(l);
        return;
      }
      const T = P(l);
      if (T && T !== P(g)) {
        g.textContent = T;
        return;
      }
      if (g.childNodes.length > 0 && l.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && l.childNodes.length > 0) {
        const M = document.createDocumentFragment();
        v(l, M, !1), g.appendChild(M);
        return;
      }
      if (l.childNodes.length > 0) {
        v(l, g, !0);
        return;
      }
    });
  };
  return { html: (s, ...n) => {
    let r = "";
    const { length: c } = s;
    for (let a = 1; a < c; a++) {
      const l = n[a - 1];
      let y = !1;
      if (r += s[a - 1], e.test(r) && t.test(r) && (r = r.replace(
        e,
        (g, A, C) => `${o}${a - 1}=${C || '"'}${A}${C ? "" : '"'}`
      ), y = !0), !y)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            r += `<!--${u}${a - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (r += `${o}${a - 1}="attrs"`);
            break;
          }
          default:
            r += l ?? "";
        }
    }
    r += s[c - 1];
    const d = k(r.trim());
    return J(d, n), z(d, n), d;
  }, render: (s, n) => {
    s && !s.children.length ? (s.innerHTML = "", s.appendChild(n)) : v(n, s, !1), m.forEach((r) => {
      r();
    }), m = [], b.forEach((r) => {
      r();
    }), b = [];
  } };
})();
class j {
  constructor(t, o) {
    h(this, "_hostElement");
    h(this, "_shadowRoot");
    h(this, "update");
    h(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = o;
  }
  get hostElement() {
    return this._hostElement;
  }
  get shadowRoot() {
    return this._shadowRoot;
  }
}
j.__metadata__ = { name: "RENDERER" };
const ne = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, D = (e, t = null) => {
  const o = document.createElement("style");
  return o.innerHTML = e, t && t.appendChild(o), o;
}, re = async (e, t) => {
  if (e = { ...ne, ...e }, F(e.styles)) {
    const o = await e.styles;
    e.styles = o.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !_.isRootNodeSet)
    _.isRootNodeSet = !0, e.styles && (_.globalStyleTag = D(e.styles, document.head), _.globalStyles.replace(e.styles));
  else if (e.root && _.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(
    e.selector,
    class extends HTMLElement {
      constructor() {
        super();
        h(this, "klass");
        h(this, "shadow");
        h(this, "componentStyleTag", null);
        h(this, "internalSubscriptions", new Z());
        h(this, "isEmulated", !1);
        h(this, "dataInputAttr", "");
        h(this, "renderCount", 0);
        h(this, "createProxyInstance", () => {
          const i = new j(this, this.shadow);
          i.update = () => {
            this.update();
          }, i.emitEvent = (u, p) => {
            this.emitEvent(u, p);
          }, this.internalSubscriptions.add(
            te(this.setRenderIntoQueue, () => {
              this.klass = W(t, e.deps, i);
            })
          );
        });
        h(this, "update", () => {
          const i = this.klass.render();
          typeof i == "string" ? this.shadow.innerHTML = V(i) : se(this.shadow, i);
        });
        h(this, "emitEvent", (i, u) => {
          const p = new CustomEvent(i, {
            detail: u
          });
          this.dispatchEvent(p);
        });
        h(this, "setProps", (i) => {
          var u, p;
          for (const [m, b] of Object.entries(i))
            if (t.prototype.__inputs__.find((f) => f === m))
              try {
                this.klass[m].set(b || void 0);
              } catch (f) {
                console.error(`Input ${m} of ${e.selector} should be a signal`, f);
              }
          (p = (u = this.klass).onPropertiesChanged) == null || p.call(u);
        });
        h(this, "getInstance", () => this.klass);
        h(this, "setRenderIntoQueue", () => {
          ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
            this.update(), this.renderCount = 0;
          });
        });
        e.shadowDomEncapsulation && B ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = _.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.dataInputAttr = this.getAttribute("data-input") || "", this.removeAttribute("data-input"), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      connectedCallback() {
        var i, u, p, m;
        if (this.isEmulated) {
          const b = R();
          this.setAttribute("data-did", b);
          const f = e.styles.replaceAll(":host", `${e.selector}[data-did='${b}']`);
          !e.root && f && (this.componentStyleTag = D(f, document.head));
        }
        this.internalSubscriptions.add(
          x(this, "bindprops", (b) => {
            const f = b.detail.props;
            f && this.setProps(f);
          })
        ), this.internalSubscriptions.add(
          x(this, "refresh_component", () => {
            this.update();
          })
        ), this.internalSubscriptions.add(
          x(window, "onLanguageChange", () => {
            this.update();
          })
        ), (u = (i = this.klass).beforeMount) == null || u.call(i), this.update(), (m = (p = this.klass).mount) == null || m.call(p), this.dataInputAttr && this.setProps(JSON.parse(this.dataInputAttr));
      }
      attributeChangedCallback(i, u, p) {
        var m, b;
        (b = (m = this.klass).onAttributesChanged) == null || b.call(m, i, u, p);
      }
      disconnectedCallback() {
        var i, u, p;
        this.renderCount = 0, (u = (i = this.klass).unmount) == null || u.call(i), (p = this.componentStyleTag) == null || p.remove(), this.internalSubscriptions.unsubscribe();
      }
    }
  );
}, oe = {
  deps: []
}, pe = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || (t.__selector__ = e.selector, re(e, t));
}, be = () => (e, t) => {
  e.__inputs__ || (e.__inputs__ = []), e.__inputs__.push(t);
}, me = (e = {}) => (t) => {
  if (e = { ...oe, ...e }, t.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((i) => {
    var u;
    return ((u = i.__metadata__) == null ? void 0 : u.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const o = W(t, e.deps);
  H.register(t, o);
};
export {
  le as BehaviourSubjectObs,
  pe as Component,
  me as Injectable,
  H as Injector,
  be as Input,
  j as Renderer,
  X as SubjectObs,
  Z as Subscriptions,
  x as fromEvent,
  fe as html,
  de as promisify,
  se as render,
  he as signal,
  ue as wrapIntoObservable
};
