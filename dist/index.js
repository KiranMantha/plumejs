var J = Object.defineProperty;
var U = (e, t, r) => t in e ? J(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var m = (e, t, r) => U(e, typeof t != "symbol" ? t + "" : t, r);
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
    Promise.resolve(e).then((r) => {
      t(r);
    });
  }
}), O = () => Math.random().toString(36).substring(2);
class G {
  constructor() {
    m(this, "_callbackCollection", {});
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
    const r = O();
    return this._callbackCollection[r] = t, () => this.unsubscribe(r);
  }
  next(t) {
    for (const r in this._callbackCollection)
      this._callbackCollection[r](t);
  }
}
class he extends G {
  constructor(r) {
    super();
    m(this, "_initialValue");
    this._initialValue = r;
  }
  subscribe(r) {
    const s = super.subscribe(r);
    return super.next(this._initialValue), s;
  }
  next(r) {
    this._initialValue = r, super.next(r);
  }
}
class X {
  constructor() {
    m(this, "_subcribers", []);
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
const fe = (e) => q(e) ? e : $(e) ? Y(Promise.resolve(e)) : B(e), k = (e, t, r, s = !1) => (e.addEventListener(t, r, s), () => {
  e.removeEventListener(t, r, s);
}), Z = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), r = (f) => {
    const p = f.querySelectorAll("script");
    for (const S of p)
      S.remove();
  }, s = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on")) return !0;
  }, c = (f) => {
    const p = f.attributes;
    for (const { name: S, value: A } of p)
      s(S, A) && f.removeAttribute(S);
  }, u = (f) => {
    const p = f.children;
    for (const S of p)
      c(S), u(S);
  }, b = t();
  return r(b), u(b), b.innerHTML;
}, V = (e, t) => {
  const r = () => ({
    get(s, c) {
      const u = Object.prototype.toString.call(s[c]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in s[c]) ? new Proxy(s[c], r()) : s[c];
    },
    set(s, c, u) {
      return s[c] = u, e(), !0;
    }
  });
  return class extends t {
    constructor(...s) {
      return super(...s), new Proxy(this, r());
    }
  };
}, pe = () => {
  let e;
  return [new Promise((r) => {
    e = r;
  }), e];
}, D = (e) => typeof e == "function", R = /* @__PURE__ */ Object.create(null);
let _ = null;
function ee(e, t) {
  const r = _;
  let s;
  _ = O(), R[_] = e;
  try {
    t();
  } finally {
    s = _, _ = r;
  }
  return s;
}
function be(e, t) {
  const r = R[_];
  let s = e;
  function c() {
    return s;
  }
  return c.set = function(u) {
    t && D(t) ? s = t(s, u) : s = D(u) ? u(s) : u;
    try {
      r();
    } catch (b) {
      console.trace(b);
    }
  }, c;
}
function te(e, t) {
  const r = ee(e, t);
  return function() {
    delete R[r];
  };
}
const W = new class {
  constructor() {
    m(this, "map", /* @__PURE__ */ new WeakMap());
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
}(), j = (e, t, r) => {
  if (t.length) {
    const s = [];
    for (const c of t)
      c.prototype.__metadata__.name !== "RENDERER" ? s.push(W.getService(c)) : s.push(r);
    return new e(...s);
  } else
    return new e();
}, E = new class {
  constructor() {
    m(this, "globalStyles");
    m(this, "style_registry");
    m(this, "isRootNodeSet");
    m(this, "globalStyleTag");
    m(this, "getComputedCss", (e = "", t) => {
      let r = [];
      const s = new CSSStyleSheet();
      if (s.insertRule(":host { display: block; }"), r = t ? [s] : [this.globalStyles, s], e) {
        const c = new CSSStyleSheet();
        c.replace(e), r.push(c);
      }
      return r;
    });
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
}(), { html: me, render: se } = /* @__PURE__ */ (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, r = "attr", s = /^attr([^ ]+)/, c = "insertNode", u = /^insertNode([^ ]+)/;
  let b = [], f = [];
  const p = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const a = (d) => i[d] || d;
    return o = ((d) => d.replace(/[&<>()]/g, a))(o), JSON.parse(o);
  }, S = (n, i) => {
    const o = n.options, a = Array.isArray(i) ? i : [i];
    let h, d, l = o.length;
    for (; l--; ) {
      d = o[l];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = a.indexOf(g) > -1) && (h = !0);
    }
    h || (n.selectedIndex = -1);
  }, A = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, N = (n, i, o) => {
    const a = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const h = new CustomEvent("bindprops", {
            detail: {
              props: i
            },
            bubbles: !1
          });
          n.dispatchEvent(h);
        }
      });
    };
    n[o] = JSON.stringify(i), f.push(a);
  }, P = (n, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const a = o.attrs;
        for (const h in a)
          P(n, h, a[h]);
        break;
      }
      case /^on+/.test(i): {
        const a = i.slice(2).toLowerCase();
        n.removeEventListener(a, o), n.addEventListener(a, o);
        break;
      }
      case /ref/.test(i): {
        const a = (function() {
          this.node.isConnected && this.fn(this.node);
        }).bind({ node: n, fn: o });
        b.push(a);
        break;
      }
      case /key/.test(i): {
        n[Symbol("key")] = o;
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? N(n, o, Symbol("input")) : n.setAttribute(i, p(o));
        break;
      }
      case /class/.test(i): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? S(n, o) : n.value = p(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? n.setAttribute(i, o) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, p(o));
    }
  }, H = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let a = o.nextNode();
    for (; a; ) {
      if (a.hasAttributes()) {
        const h = Array.from(a.attributes).filter((d) => s.test(d.nodeName));
        for (const { nodeName: d, nodeValue: l } of h) {
          const g = s.exec(d)[1];
          P(a, l, i[g]), a.removeAttribute(d);
        }
      }
      a = o.nextNode();
    }
  }, Q = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let a = o.nextNode(), h;
    for (; a; ) {
      if (h = u.exec(a.data)) {
        const d = Array.isArray(i[h[1]]) ? i[h[1]] : [i[h[1]]];
        a.replaceWith(...d), o.currentNode = n;
      }
      a = o.nextNode();
    }
  }, C = (n, i) => {
    if (!n)
      return [null, ""];
    const o = Object.getOwnPropertySymbols(n).find((h) => h.description === i), a = o ? n[o] : "";
    return [o, a];
  }, z = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1) return;
    const o = n.attributes, a = i.attributes, h = i.getAttribute("data-preserve-attributes"), d = h && h === "true";
    for (const { name: l, value: g } of o)
      (!a[l] || a[l] !== g) && i.setAttribute(l, g);
    if (!d)
      for (const { name: l } of a)
        o[l] || i.removeAttribute(l);
    if (["input", "textarea"].includes(i.tagName.toLowerCase()) && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const l = C(n, "input")[1], g = C(i, "input");
      l && g[1] && l !== g[1] && N(i, JSON.parse(l), g[0]);
    }
  }, L = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), I = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, v = (n, i, o) => {
    const a = i ? Array.from(i.childNodes) : [], h = n ? Array.from(n.childNodes) : [];
    let d = a.length - h.length;
    if (d > 0)
      for (; d > 0; d--)
        a[a.length - d].parentNode.removeChild(a[a.length - d]);
    h.forEach((l, g) => {
      const y = a[g], T = C(l, "key")[1], w = C(y, "key")[1];
      if (z(l, y), o && y && y.nodeType === 1 && y.tagName.indexOf("-") > -1)
        return;
      if (!y) {
        i && i.appendChild(l);
        return;
      }
      if (T && w && T !== w || L(l) !== L(y)) {
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
        v(l, M, !1), y.appendChild(M);
        return;
      }
      if (l.childNodes.length > 0) {
        v(l, y, !0);
        return;
      }
    });
  };
  return { html: (n, ...i) => {
    let o = "";
    const { length: a } = n;
    for (let d = 1; d < a; d++) {
      const l = i[d - 1];
      let g = !1;
      if (o += n[d - 1], e.test(o) && t.test(o) && (o = o.replace(
        e,
        (y, T, w) => `${r}${d - 1}=${w || '"'}${T}${w ? "" : '"'}`
      ), g = !0), !g)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            o += `<!--${c}${d - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (o += `${r}${d - 1}="attrs"`);
            break;
          }
          default:
            o += l ?? "";
        }
    }
    o += n[a - 1];
    const h = A(o.trim());
    return H(h, i), Q(h, i), h;
  }, render: (n, i) => {
    n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : v(i, n, !1), b.forEach((o) => {
      o();
    }), b = [], f.forEach((o) => {
      o();
    }), f = [];
  } };
})();
class ne {
  constructor(t, r) {
    m(this, "_hostElement");
    m(this, "_shadowRoot");
    m(this, "update");
    m(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = r;
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
  const r = document.createElement("style");
  return r.innerHTML = e, t && t.appendChild(r), r;
}, ie = async (e, t) => {
  if (e = { ...re, ...e }, $(e.styles)) {
    const r = await e.styles;
    e.styles = r.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !E.isRootNodeSet)
    E.isRootNodeSet = !0, e.styles && (E.globalStyleTag = F(e.styles, document.head), E.globalStyles.replace(e.styles));
  else if (e.root && E.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(
    e.selector,
    class extends HTMLElement {
      constructor() {
        super();
        m(this, "klass");
        m(this, "shadow");
        m(this, "componentStyleTag", null);
        m(this, "internalSubscriptions", new X());
        m(this, "isEmulated", !1);
        m(this, "renderCount", 0);
        e.shadowDomEncapsulation && K ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = E.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      createProxyInstance() {
        const s = new ne(this, this.shadow);
        s.update = () => {
          this.update();
        }, s.emitEvent = (c, u) => {
          this.emitEvent(c, u);
        }, this.internalSubscriptions.add(
          te(this.setRenderIntoQueue, () => {
            this.klass = j(
              V(this.setRenderIntoQueue, t),
              e.deps,
              s
            );
          })
        );
      }
      update() {
        const s = this.klass.render();
        typeof s == "string" ? this.shadow.innerHTML = Z(s) : se(this.shadow, s);
      }
      emitEvent(s, c) {
        const u = new CustomEvent(s, {
          detail: c
        });
        this.dispatchEvent(u);
      }
      setProps(s) {
        var c, u;
        for (const [b, f] of Object.entries(s))
          t.observedProperties.find((p) => p === b) && (this.klass[b] = f);
        (u = (c = this.klass).onPropertiesChanged) == null || u.call(c);
      }
      getInstance() {
        return this.klass;
      }
      setRenderIntoQueue() {
        ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
          this.update(), this.renderCount = 0;
        });
      }
      connectedCallback() {
        var s, c, u, b;
        if (this.isEmulated) {
          const f = O();
          this.setAttribute("data-did", f);
          const p = e.styles.replaceAll(":host", `${e.selector}[data-did='${f}']`);
          !e.root && p && (this.componentStyleTag = F(p, document.head));
        }
        this.internalSubscriptions.add(
          k(this, "bindprops", (f) => {
            const p = f.detail.props;
            p && this.setProps(p);
          })
        ), this.internalSubscriptions.add(
          k(this, "refresh_component", () => {
            this.update();
          })
        ), this.internalSubscriptions.add(
          k(window, "onLanguageChange", () => {
            this.update();
          })
        ), (c = (s = this.klass).beforeMount) == null || c.call(s), this.update(), (b = (u = this.klass).mount) == null || b.call(u);
      }
      attributeChangedCallback(s, c, u) {
        var b, f;
        (f = (b = this.klass).onAttributesChanged) == null || f.call(b, s, c, u);
      }
      disconnectedCallback() {
        var s, c, u;
        this.renderCount = 0, (c = (s = this.klass).unmount) == null || c.call(s), (u = this.componentStyleTag) == null || u.remove(), this.internalSubscriptions.unsubscribe();
      }
    }
  );
}, oe = {
  deps: []
}, ye = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || (Object.defineProperty(t.prototype, "selector", {
    get() {
      return e.selector;
    }
  }), ie(e, t));
}, ce = (e = {}) => (t) => {
  if (e = { ...oe, ...e }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((s) => {
    var c;
    return ((c = s.prototype.__metadata__) == null ? void 0 : c.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const r = j(t, e.deps);
  W.register(t, r);
};
class ae {
  constructor() {
    m(this, "transition", "");
    this.whichTransitionEnd();
  }
  onTransitionEnd(t, r, s) {
    let c = !1, u = null;
    const b = () => {
      c || (c = !0, r && r(), u(), u = null);
    };
    u = k(t, this.transition, () => {
      b();
    }), setTimeout(b, s);
  }
  animationsComplete(t) {
    return new Promise((r) => {
      t.getAnimations ? Promise.allSettled(t.getAnimations().map((s) => s.finished)).then(() => {
        r(!0);
      }) : r(!0);
    });
  }
  whichTransitionEnd() {
    const r = document.createElement("div").style, s = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "otransitionend"
    };
    for (const c in s)
      if (typeof r[c] < "u") {
        this.transition = s[c];
        break;
      }
  }
}
ce()(ae);
export {
  he as BehaviourSubjectObs,
  ye as Component,
  ae as DomTransition,
  ce as Injectable,
  W as Injector,
  ne as Renderer,
  G as SubjectObs,
  X as Subscriptions,
  k as fromEvent,
  me as html,
  pe as promisify,
  se as render,
  be as signal,
  fe as wrapIntoObservable
};
