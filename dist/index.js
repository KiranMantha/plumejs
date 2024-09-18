var Q = Object.defineProperty;
var U = (e, t, o) => t in e ? Q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var f = (e, t, o) => U(e, typeof t != "symbol" ? t + "" : t, o);
const q = (e) => !!e && typeof e.subscribe == "function", $ = (e) => !!e && typeof e.then == "function", K = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), B = (e) => ({
  subscribe: (t) => {
    t(e);
  }
}), Y = (e) => ({
  subscribe: (t) => {
    Promise.resolve(e).then((o) => {
      t(o);
    });
  }
}), O = () => Math.random().toString(36).substring(2);
class G {
  constructor() {
    f(this, "_callbackCollection", {});
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
    const o = O();
    return this._callbackCollection[o] = t, () => this.unsubscribe(o);
  }
  next(t) {
    for (const o in this._callbackCollection)
      this._callbackCollection[o](t);
  }
}
class ue extends G {
  constructor(o) {
    super();
    f(this, "_initialValue");
    this._initialValue = o;
  }
  subscribe(o) {
    const r = super.subscribe(o);
    return super.next(this._initialValue), r;
  }
  next(o) {
    this._initialValue = o, super.next(o);
  }
}
class X {
  constructor() {
    f(this, "_subcribers", []);
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
const de = (e) => q(e) ? e : $(e) ? Y(Promise.resolve(e)) : B(e), T = (e, t, o, r = !1) => (e.addEventListener(t, o, r), () => {
  e.removeEventListener(t, o, r);
}), Z = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), o = (p) => {
    const b = p.querySelectorAll("script");
    for (const S of b)
      S.remove();
  }, r = (p, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(p) && (b.includes("javascript:") || b.includes("data:")) || p.startsWith("on")) return !0;
  }, a = (p) => {
    const b = p.attributes;
    for (const { name: S, value: v } of b)
      r(S, v) && p.removeAttribute(S);
  }, d = (p) => {
    const b = p.children;
    for (const S of b)
      a(S), d(S);
  }, m = t();
  return o(m), d(m), m.innerHTML;
}, V = (e, t) => {
  const o = () => ({
    get(r, a) {
      const d = Object.prototype.toString.call(r[a]);
      return ["[object Object]", "[object Array]"].indexOf(d) > -1 && !("__metadata__" in r[a]) ? new Proxy(r[a], o()) : r[a];
    },
    set(r, a, d) {
      return r[a] = d, e(), !0;
    }
  });
  return class extends t {
    constructor(...r) {
      return super(...r), new Proxy(this, o());
    }
  };
}, he = () => {
  let e;
  return [new Promise((o) => {
    e = o;
  }), e];
}, D = (e) => typeof e == "function", R = {};
let E = null;
function ee(e, t) {
  const o = E;
  let r;
  E = O(), R[E] = e;
  try {
    t();
  } finally {
    r = E, E = o;
  }
  return r;
}
function fe(e, t) {
  const o = R[E];
  let r = e;
  function a() {
    return r;
  }
  return a.set = function(d) {
    t && D(t) ? r = t(r, d) : r = D(d) ? d(r) : d;
    try {
      o();
    } catch (m) {
      console.trace(m);
    }
  }, a;
}
function te(e, t) {
  const o = ee(e, t);
  return function() {
    delete R[o];
  };
}
const H = new class {
  constructor() {
    f(this, "map", /* @__PURE__ */ new WeakMap());
  }
  register(e, t) {
    if (!this.map.get(e))
      this.map.set(e, t);
    else
      throw Error(`${e} is already registered service.`);
  }
  getService(e) {
    const t = this.map.get(e);
    if (t)
      return t;
    throw Error(`${e} is not a registered provider.`);
  }
  removeService(e) {
    this.map.delete(e);
  }
  clear() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
}(), W = (e, t, o) => {
  if (t.length) {
    const r = [];
    for (const a of t)
      a.prototype.__metadata__.name !== "RENDERER" ? r.push(H.getService(a)) : r.push(o);
    return new e(...r);
  } else
    return new e();
}, _ = new class {
  constructor() {
    f(this, "globalStyles");
    f(this, "style_registry");
    f(this, "isRootNodeSet");
    f(this, "globalStyleTag");
    f(this, "getComputedCss", (e = "", t) => {
      let o = [];
      const r = new CSSStyleSheet();
      if (r.insertRule(":host { display: block; }"), o = t ? [r] : [this.globalStyles, r], e) {
        const a = new CSSStyleSheet();
        a.replace(e), o.push(a);
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
}(), { html: pe, render: se } = /* @__PURE__ */ (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, o = "attr", r = /^attr([^ ]+)/, a = "insertNode", d = /^insertNode([^ ]+)/;
  let m = [], p = [];
  const b = (s) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let i = JSON.stringify(s);
    const c = (u) => n[u] || u;
    return i = ((u) => u.replace(/[&<>()]/g, c))(i), JSON.parse(i);
  }, S = (s, n) => {
    const i = s.options, c = Array.isArray(n) ? n : [n];
    let h, u, l = i.length;
    for (; l--; ) {
      u = i[l];
      const g = u.getAttribute("value") ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (u.selected = c.indexOf(g) > -1) && (h = !0);
    }
    h || (s.selectedIndex = -1);
  }, v = (s) => {
    const n = document.createElement("template");
    return n.innerHTML = s, n.content;
  }, N = (s, n, i) => {
    const c = () => {
      setTimeout(() => {
        if (s.isConnected) {
          const h = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          s.dispatchEvent(h);
        }
      });
    };
    s[i] = JSON.stringify(n), p.push(c);
  }, P = (s, n, i) => {
    switch (!0) {
      case /attrs/.test(n): {
        const c = i.attrs;
        for (const h in c)
          P(s, h, c[h]);
        break;
      }
      case /^on+/.test(n): {
        const c = n.slice(2).toLowerCase();
        s.removeEventListener(c, i), s.addEventListener(c, i);
        break;
      }
      case /ref/.test(n): {
        const c = (function() {
          this.node.isConnected && this.fn(this.node);
        }).bind({ node: s, fn: i });
        m.push(c);
        break;
      }
      case /key/.test(n): {
        s[Symbol("key")] = i;
        break;
      }
      case /^data-+/.test(n):
      case /^aria-+/.test(n): {
        n === "data-input" ? N(s, i, Symbol("input")) : s.setAttribute(n, b(i));
        break;
      }
      case /class/.test(n): {
        i ? s.classList.add(...i.split(" ")) : s.setAttribute("class", "");
        break;
      }
      case /value/.test(n): {
        s.nodeName.toLowerCase() === "select" ? S(s, i) : s.value = b(i);
        break;
      }
      case /disabled/.test(n):
      case /checked/.test(n): {
        i ? s.setAttribute(n, i) : s.removeAttribute(n);
        break;
      }
      default:
        s.setAttribute(n, b(i));
    }
  }, j = (s, n) => {
    const i = document.createTreeWalker(s, NodeFilter.SHOW_ELEMENT, null);
    let c = i.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const h = Array.from(c.attributes).filter((u) => r.test(u.nodeName));
        for (const { nodeName: u, nodeValue: l } of h) {
          const g = r.exec(u)[1];
          P(c, l, n[g]), c.removeAttribute(u);
        }
      }
      c = i.nextNode();
    }
  }, J = (s, n) => {
    const i = document.createTreeWalker(s, NodeFilter.SHOW_COMMENT, null);
    let c = i.nextNode(), h;
    for (; c; ) {
      if (h = d.exec(c.data)) {
        const u = Array.isArray(n[h[1]]) ? n[h[1]] : [n[h[1]]];
        c.replaceWith(...u), i.currentNode = s;
      }
      c = i.nextNode();
    }
  }, w = (s, n) => {
    if (!s)
      return [null, ""];
    const i = Object.getOwnPropertySymbols(s).find((h) => h.description === n), c = i ? s[i] : "";
    return [i, c];
  }, z = (s, n) => {
    if (!s || !n || s.nodeType !== 1 || n.nodeType !== 1) return;
    const i = s.attributes, c = n.attributes, h = n.getAttribute("data-preserve-attributes"), u = h && h === "true";
    for (const { name: l, value: g } of i)
      (!c[l] || c[l] !== g) && n.setAttribute(l, g);
    if (!u)
      for (const { name: l } of c)
        i[l] || n.removeAttribute(l);
    if (["input", "textarea"].includes(n.tagName.toLowerCase()) && (n.value = s.value), n.tagName.indexOf("-") > -1 && s.tagName.indexOf("-") > -1) {
      const l = w(s, "input")[1], g = w(n, "input");
      l && g[1] && l !== g[1] && N(n, JSON.parse(l), g[0]);
    }
  }, L = (s) => s.nodeType === 3 ? "text" : s.nodeType === 8 ? "comment" : s.tagName.toLowerCase(), I = (s) => s.childNodes && s.childNodes.length > 0 ? null : s.textContent, A = (s, n, i) => {
    const c = n ? Array.from(n.childNodes) : [], h = s ? Array.from(s.childNodes) : [];
    let u = c.length - h.length;
    if (u > 0)
      for (; u > 0; u--)
        c[c.length - u].parentNode.removeChild(c[c.length - u]);
    h.forEach((l, g) => {
      const y = c[g], k = w(l, "key")[1], C = w(y, "key")[1];
      if (z(l, y), i && y && y.nodeType === 1 && y.tagName.indexOf("-") > -1)
        return;
      if (!y) {
        n && n.appendChild(l);
        return;
      }
      if (k && C && k !== C || L(l) !== L(y)) {
        y.replaceWith(l);
        return;
      }
      const x = I(l);
      if (x && x !== I(y)) {
        y.textContent = x;
        return;
      }
      if (y.childNodes.length > 0 && l.childNodes.length < 1) {
        y.innerHTML = "";
        return;
      }
      if (y.childNodes.length < 1 && l.childNodes.length > 0) {
        const M = document.createDocumentFragment();
        A(l, M, !1), y.appendChild(M);
        return;
      }
      if (l.childNodes.length > 0) {
        A(l, y, !0);
        return;
      }
    });
  };
  return { html: (s, ...n) => {
    let i = "";
    const { length: c } = s;
    for (let u = 1; u < c; u++) {
      const l = n[u - 1];
      let g = !1;
      if (i += s[u - 1], e.test(i) && t.test(i) && (i = i.replace(
        e,
        (y, k, C) => `${o}${u - 1}=${C || '"'}${k}${C ? "" : '"'}`
      ), g = !0), !g)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            i += `<!--${a}${u - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (i += `${o}${u - 1}="attrs"`);
            break;
          }
          default:
            i += l ?? "";
        }
    }
    i += s[c - 1];
    const h = v(i.trim());
    return j(h, n), J(h, n), h;
  }, render: (s, n) => {
    s && !s.children.length ? (s.innerHTML = "", s.appendChild(n)) : A(n, s, !1), m.forEach((i) => {
      i();
    }), m = [], p.forEach((i) => {
      i();
    }), p = [];
  } };
})();
class ne {
  constructor(t, o) {
    f(this, "_hostElement");
    f(this, "_shadowRoot");
    f(this, "update");
    f(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = o;
  }
  get __metadata__() {
    return { name: "RENDERER" };
  }
  get hostElement() {
    return this._hostElement;
  }
  get shadowRoot() {
    return this._shadowRoot;
  }
}
const re = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, F = (e, t = null) => {
  const o = document.createElement("style");
  return o.innerHTML = e, t && t.appendChild(o), o;
}, oe = async (e, t) => {
  if (e = { ...re, ...e }, $(e.styles)) {
    const o = await e.styles;
    e.styles = o.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !_.isRootNodeSet)
    _.isRootNodeSet = !0, e.styles && (_.globalStyleTag = F(e.styles, document.head), _.globalStyles.replace(e.styles));
  else if (e.root && _.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(
    e.selector,
    class extends HTMLElement {
      constructor() {
        super();
        f(this, "klass");
        f(this, "shadow");
        f(this, "componentStyleTag", null);
        f(this, "internalSubscriptions", new X());
        f(this, "isEmulated", !1);
        f(this, "renderCount", 0);
        f(this, "createProxyInstance", () => {
          const r = new ne(this, this.shadow);
          r.update = () => {
            this.update();
          }, r.emitEvent = (a, d) => {
            this.emitEvent(a, d);
          }, this.internalSubscriptions.add(
            te(this.setRenderIntoQueue, () => {
              this.klass = W(
                V(this.setRenderIntoQueue, t),
                e.deps,
                r
              );
            })
          );
        });
        f(this, "update", () => {
          const r = this.klass.render();
          typeof r == "string" ? this.shadow.innerHTML = Z(r) : se(this.shadow, r);
        });
        f(this, "emitEvent", (r, a) => {
          const d = new CustomEvent(r, {
            detail: a
          });
          this.dispatchEvent(d);
        });
        f(this, "setProps", (r) => {
          var a, d;
          for (const [m, p] of Object.entries(r))
            t.observedProperties.find((b) => b === m) && (this.klass[m] = p);
          (d = (a = this.klass).onPropertiesChanged) == null || d.call(a);
        });
        f(this, "getInstance", () => this.klass);
        f(this, "setRenderIntoQueue", () => {
          ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
            this.update(), this.renderCount = 0;
          });
        });
        e.shadowDomEncapsulation && K ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = _.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      connectedCallback() {
        var r, a, d, m;
        if (this.isEmulated) {
          const p = O();
          this.setAttribute("data-did", p);
          const b = e.styles.replaceAll(":host", `${e.selector}[data-did='${p}']`);
          !e.root && b && (this.componentStyleTag = F(b, document.head));
        }
        this.internalSubscriptions.add(
          T(this, "bindprops", (p) => {
            const b = p.detail.props;
            b && this.setProps(b);
          })
        ), this.internalSubscriptions.add(
          T(this, "refresh_component", () => {
            this.update();
          })
        ), this.internalSubscriptions.add(
          T(window, "onLanguageChange", () => {
            this.update();
          })
        ), (a = (r = this.klass).beforeMount) == null || a.call(r), this.update(), (m = (d = this.klass).mount) == null || m.call(d);
      }
      attributeChangedCallback(r, a, d) {
        var m, p;
        (p = (m = this.klass).onAttributesChanged) == null || p.call(m, r, a, d);
      }
      disconnectedCallback() {
        var r, a, d;
        this.renderCount = 0, (a = (r = this.klass).unmount) == null || a.call(r), (d = this.componentStyleTag) == null || d.remove(), this.internalSubscriptions.unsubscribe();
      }
    }
  );
}, ie = {
  deps: []
}, be = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || (Object.defineProperty(t.prototype, "selector", {
    get() {
      return e.selector;
    }
  }), oe(e, t));
}, me = (e = {}) => (t) => {
  if (e = { ...ie, ...e }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((r) => {
    var a;
    return ((a = r.prototype.__metadata__) == null ? void 0 : a.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const o = W(t, e.deps);
  H.register(t, o);
};
export {
  ue as BehaviourSubjectObs,
  be as Component,
  me as Injectable,
  H as Injector,
  ne as Renderer,
  G as SubjectObs,
  X as Subscriptions,
  T as fromEvent,
  pe as html,
  he as promisify,
  se as render,
  fe as signal,
  de as wrapIntoObservable
};
