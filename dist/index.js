var q = Object.defineProperty;
var K = (e, t, o) => t in e ? q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var h = (e, t, o) => K(e, typeof t != "symbol" ? t + "" : t, o);
const $ = (e) => typeof e == "function", Q = (e) => !!e && typeof e.subscribe == "function", F = (e) => !!e && typeof e.then == "function", B = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
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
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), o = (p) => {
    const b = p.querySelectorAll("script");
    for (const _ of b)
      _.remove();
  }, i = (p, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(p) && (b.includes("javascript:") || b.includes("data:")) || p.startsWith("on")) return !0;
  }, u = (p) => {
    const b = p.attributes;
    for (const { name: _, value: v } of b)
      i(_, v) && p.removeAttribute(_);
  }, f = (p) => {
    const b = p.children;
    for (const _ of b)
      u(_), f(_);
  }, m = t();
  return o(m), f(m), m.innerHTML;
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
  return u.set = (f) => {
    t && $(t) ? i = t(i, f) : i = $(f) ? f(i) : f;
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
}, S = new class {
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
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
}(), { html: fe, render: se } = /* @__PURE__ */ (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, o = "attr", i = /^attr([^ ]+)/, u = "insertNode", f = /^insertNode([^ ]+)/;
  let m = [], p = [];
  const b = (s) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let r = JSON.stringify(s);
    const c = (l) => n[l] || l;
    return r = ((l) => l.replace(/[&<>()]/g, c))(r), JSON.parse(r);
  }, _ = (s, n) => {
    const r = s.options, c = Array.isArray(n) ? n : [n];
    let d, l, a = r.length;
    for (; a--; ) {
      l = r[a];
      const y = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = c.indexOf(y) > -1) && (d = !0);
    }
    d || (s.selectedIndex = -1);
  }, v = (s) => {
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
    s[r] = JSON.stringify(n), p.push(c);
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
        const c = (function() {
          this.node.isConnected && this.fn(this.node);
        }).bind({ node: s, fn: r });
        m.push(c);
        break;
      }
      case /key/.test(n): {
        s[Symbol("key")] = r;
        break;
      }
      case /^data-+/.test(n):
      case /^aria-+/.test(n): {
        n === "data-input" ? N(s, r, Symbol("input")) : s.setAttribute(n, b(r));
        break;
      }
      case /class/.test(n): {
        r ? s.classList.add(...r.split(" ")) : s.setAttribute("class", "");
        break;
      }
      case /value/.test(n): {
        s.nodeName.toLowerCase() === "select" ? _(s, r) : s.value = b(r);
        break;
      }
      case /disabled/.test(n):
      case /checked/.test(n): {
        r ? s.setAttribute(n, r) : s.removeAttribute(n);
        break;
      }
      default:
        s.setAttribute(n, b(r));
    }
  }, J = (s, n) => {
    const r = document.createTreeWalker(s, NodeFilter.SHOW_ELEMENT, null);
    let c = r.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const d = Array.from(c.attributes).filter((l) => i.test(l.nodeName));
        for (const { nodeName: l, nodeValue: a } of d) {
          const y = i.exec(l)[1];
          L(c, a, n[y]), c.removeAttribute(l);
        }
      }
      c = r.nextNode();
    }
  }, z = (s, n) => {
    const r = document.createTreeWalker(s, NodeFilter.SHOW_COMMENT, null);
    let c = r.nextNode(), d;
    for (; c; ) {
      if (d = f.exec(c.data)) {
        const l = Array.isArray(n[d[1]]) ? n[d[1]] : [n[d[1]]];
        c.replaceWith(...l), r.currentNode = s;
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
    const r = s.attributes, c = n.attributes, d = n.getAttribute("data-preserve-attributes"), l = d && d === "true";
    for (const { name: a, value: y } of r)
      (!c[a] || c[a] !== y) && n.setAttribute(a, y);
    if (!l)
      for (const { name: a } of c)
        r[a] || n.removeAttribute(a);
    if (["input", "textarea"].includes(n.tagName.toLowerCase()) && (n.value = s.value), n.tagName.indexOf("-") > -1 && s.tagName.indexOf("-") > -1) {
      const a = w(s, "input")[1], y = w(n, "input");
      a && y[1] && a !== y[1] && N(n, JSON.parse(a), y[0]);
    }
  }, P = (s) => s.nodeType === 3 ? "text" : s.nodeType === 8 ? "comment" : s.tagName.toLowerCase(), I = (s) => s.childNodes && s.childNodes.length > 0 ? null : s.textContent, A = (s, n, r) => {
    const c = n ? Array.from(n.childNodes) : [], d = s ? Array.from(s.childNodes) : [];
    let l = c.length - d.length;
    if (l > 0)
      for (; l > 0; l--)
        c[c.length - l].parentNode.removeChild(c[c.length - l]);
    d.forEach((a, y) => {
      const g = c[y], k = w(a, "key")[1], C = w(g, "key")[1];
      if (U(a, g), r && g && g.nodeType === 1 && g.tagName.indexOf("-") > -1)
        return;
      if (!g) {
        n && n.appendChild(a);
        return;
      }
      if (k && C && k !== C || P(a) !== P(g)) {
        g.replaceWith(a);
        return;
      }
      const T = I(a);
      if (T && T !== I(g)) {
        g.textContent = T;
        return;
      }
      if (g.childNodes.length > 0 && a.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && a.childNodes.length > 0) {
        const M = document.createDocumentFragment();
        A(a, M, !1), g.appendChild(M);
        return;
      }
      if (a.childNodes.length > 0) {
        A(a, g, !0);
        return;
      }
    });
  };
  return { html: (s, ...n) => {
    let r = "";
    const { length: c } = s;
    for (let l = 1; l < c; l++) {
      const a = n[l - 1];
      let y = !1;
      if (r += s[l - 1], e.test(r) && t.test(r) && (r = r.replace(
        e,
        (g, k, C) => `${o}${l - 1}=${C || '"'}${k}${C ? "" : '"'}`
      ), y = !0), !y)
        switch (!0) {
          case Array.isArray(a):
          case a instanceof DocumentFragment: {
            r += `<!--${u}${l - 1}-->`;
            break;
          }
          case (typeof a == "object" && a !== null): {
            "attrs" in a && (r += `${o}${l - 1}="attrs"`);
            break;
          }
          default:
            r += a ?? "";
        }
    }
    r += s[c - 1];
    const d = v(r.trim());
    return J(d, n), z(d, n), d;
  }, render: (s, n) => {
    s && !s.children.length ? (s.innerHTML = "", s.appendChild(n)) : A(n, s, !1), m.forEach((r) => {
      r();
    }), m = [], p.forEach((r) => {
      r();
    }), p = [];
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
  if (e.styles = e.styles.toString(), e.root && !S.isRootNodeSet)
    S.isRootNodeSet = !0, e.styles && (S.globalStyleTag = D(e.styles, document.head), S.globalStyles.replace(e.styles));
  else if (e.root && S.isRootNodeSet)
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
        h(this, "renderCount", 0);
        h(this, "createProxyInstance", () => {
          const i = new j(this, this.shadow);
          i.update = () => {
            this.update();
          }, i.emitEvent = (u, f) => {
            this.emitEvent(u, f);
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
          const f = new CustomEvent(i, {
            detail: u
          });
          this.dispatchEvent(f);
        });
        h(this, "setProps", (i) => {
          var u, f;
          for (const [m, p] of Object.entries(i))
            if (t.prototype.__inputs__.find((b) => b === m))
              try {
                this.klass[m].set(p);
              } catch {
                console.error(`Input ${m} of ${e.selector} should be a signal`);
              }
          (f = (u = this.klass).onPropertiesChanged) == null || f.call(u);
        });
        h(this, "getInstance", () => this.klass);
        h(this, "setRenderIntoQueue", () => {
          ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
            this.update(), this.renderCount = 0;
          });
        });
        e.shadowDomEncapsulation && B ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = S.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      connectedCallback() {
        var i, u, f, m;
        if (this.isEmulated) {
          const p = R();
          this.setAttribute("data-did", p);
          const b = e.styles.replaceAll(":host", `${e.selector}[data-did='${p}']`);
          !e.root && b && (this.componentStyleTag = D(b, document.head));
        }
        this.internalSubscriptions.add(
          x(this, "bindprops", (p) => {
            const b = p.detail.props;
            b && this.setProps(b);
          })
        ), this.internalSubscriptions.add(
          x(this, "refresh_component", () => {
            this.update();
          })
        ), this.internalSubscriptions.add(
          x(window, "onLanguageChange", () => {
            this.update();
          })
        ), (u = (i = this.klass).beforeMount) == null || u.call(i), this.update(), (m = (f = this.klass).mount) == null || m.call(f);
      }
      attributeChangedCallback(i, u, f) {
        var m, p;
        (p = (m = this.klass).onAttributesChanged) == null || p.call(m, i, u, f);
      }
      disconnectedCallback() {
        var i, u, f;
        this.renderCount = 0, (u = (i = this.klass).unmount) == null || u.call(i), (f = this.componentStyleTag) == null || f.remove(), this.internalSubscriptions.unsubscribe();
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
