var J = Object.defineProperty;
var U = (e, t, s) => t in e ? J(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var b = (e, t, s) => (U(e, typeof t != "symbol" ? t + "" : t, s), s);
const q = (e) => !!e && typeof e.subscribe == "function", j = (e) => !!e && typeof e.then == "function", K = (() => {
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
    Promise.resolve(e).then((s) => {
      t(s);
    });
  }
}), O = () => Math.random().toString(36).substring(2);
class G {
  constructor() {
    b(this, "_callbackCollection", {});
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
    const s = O();
    return this._callbackCollection[s] = t, () => this.unsubscribe(s);
  }
  next(t) {
    for (const s in this._callbackCollection)
      this._callbackCollection[s](t);
  }
}
class he extends G {
  constructor(s) {
    super();
    b(this, "_initialValue");
    this._initialValue = s;
  }
  subscribe(s) {
    const r = super.subscribe(s);
    return super.next(this._initialValue), r;
  }
  next(s) {
    this._initialValue = s, super.next(s);
  }
}
class X {
  constructor() {
    b(this, "_subcribers", []);
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
const fe = (e) => q(e) ? e : j(e) ? Y(Promise.resolve(e)) : B(e), k = (e, t, s, r = !1) => (e.addEventListener(t, s, r), () => {
  e.removeEventListener(t, s, r);
}), Z = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), s = (f) => {
    const p = f.querySelectorAll("script");
    for (const S of p)
      S.remove();
  }, r = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, c = (f) => {
    const p = f.attributes;
    for (const { name: S, value: v } of p)
      r(S, v) && f.removeAttribute(S);
  }, u = (f) => {
    const p = f.children;
    for (const S of p)
      c(S), u(S);
  }, m = t();
  return s(m), u(m), m.innerHTML;
}, V = (e, t) => {
  const s = () => ({
    get(r, c) {
      const u = Object.prototype.toString.call(r[c]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in r[c]) ? new Proxy(r[c], s()) : r[c];
    },
    set(r, c, u) {
      return r[c] = u, e(), !0;
    }
  });
  return class extends t {
    constructor(...r) {
      return super(...r), new Proxy(this, s());
    }
  };
}, pe = () => {
  let e;
  return [new Promise((s) => {
    e = s;
  }), e];
}, F = (e) => typeof e == "function", R = /* @__PURE__ */ Object.create(null);
let _ = null;
function ee(e, t) {
  const s = _;
  let r;
  _ = O(), R[_] = e;
  try {
    t();
  } finally {
    r = _, _ = s;
  }
  return r;
}
function be(e, t) {
  const s = R[_];
  let r = e;
  function c() {
    return r;
  }
  return c.set = function(u) {
    t && F(t) ? r = t(r, u) : r = F(u) ? u(r) : u;
    try {
      s();
    } catch {
    }
  }, c;
}
function te(e, t) {
  const s = ee(e, t);
  return function() {
    delete R[s];
  };
}
const N = new class {
  constructor() {
    b(this, "map", /* @__PURE__ */ new WeakMap());
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
}(), W = (e, t, s) => {
  if (t.length) {
    const r = [];
    for (const c of t)
      c.prototype.__metadata__.name !== "RENDERER" ? r.push(N.getService(c)) : r.push(s);
    return new e(...r);
  } else
    return new e();
}, E = new class {
  constructor() {
    b(this, "globalStyles");
    b(this, "style_registry");
    b(this, "isRootNodeSet");
    b(this, "globalStyleTag");
    b(this, "getComputedCss", (e = "", t) => {
      let s = [];
      const r = new CSSStyleSheet();
      if (r.insertRule(":host { display: block; }"), s = t ? [r] : [this.globalStyles, r], e) {
        const c = new CSSStyleSheet();
        c.replace(e), s.push(c);
      }
      return s;
    });
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
}(), { html: me, render: se } = /* @__PURE__ */ (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, c = "insertNode", u = /^insertNode([^ ]+)/;
  let m = [], f = [];
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
    return o = ((d) => d.replace(/[&<>\(\)]/g, a))(o), JSON.parse(o);
  }, S = (n, i) => {
    const o = n.options, a = Array.isArray(i) ? i : [i];
    let h, d, l = o.length;
    for (; l--; ) {
      d = o[l];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = a.indexOf(g) > -1) && (h = !0);
    }
    h || (n.selectedIndex = -1);
  }, v = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, P = (n, i, o) => {
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
  }, L = (n, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const a = o.attrs;
        for (const h in a)
          L(n, h, a[h]);
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
        m.push(a);
        break;
      }
      case /key/.test(i): {
        n[Symbol("key")] = o;
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(i, p(o));
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
        const h = Array.from(a.attributes).filter((d) => r.test(d.nodeName));
        for (const { nodeName: d, nodeValue: l } of h) {
          const g = r.exec(d)[1];
          L(a, l, i[g]), a.removeAttribute(d);
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
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = n.attributes, a = i.attributes, h = i.getAttribute("data-preserve-attributes"), d = h && h === "true";
    for (const { name: l, value: g } of o)
      (!a[l] || a[l] !== g) && i.setAttribute(l, g);
    if (!d)
      for (const { name: l } of a)
        o[l] || i.removeAttribute(l);
    if (["input", "textarea"].includes(i.tagName.toLowerCase()) && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const l = C(n, "input")[1], g = C(i, "input");
      l && g[1] && l !== g[1] && P(i, JSON.parse(l), g[0]);
    }
  }, I = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, A = (n, i, o) => {
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
      if (T && w && T !== w || I(l) !== I(y)) {
        y.replaceWith(l);
        return;
      }
      const x = M(l);
      if (x && x !== M(y)) {
        y.textContent = x;
        return;
      }
      if (y.childNodes.length > 0 && l.childNodes.length < 1) {
        y.innerHTML = "";
        return;
      }
      if (y.childNodes.length < 1 && l.childNodes.length > 0) {
        const D = document.createDocumentFragment();
        A(l, D, !1), y.appendChild(D);
        return;
      }
      if (l.childNodes.length > 0) {
        A(l, y, !0);
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
        (y, T, w) => `${s}${d - 1}=${w || '"'}${T}${w ? "" : '"'}`
      ), g = !0), !g)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            o += `<!--${c}${d - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (o += `${s}${d - 1}="attrs"`);
            break;
          }
          default:
            o += l ?? "";
        }
    }
    o += n[a - 1];
    const h = v(o.trim());
    return H(h, i), Q(h, i), h;
  }, render: (n, i) => {
    n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : A(i, n, !1), m.forEach((o) => {
      o();
    }), m = [], f.forEach((o) => {
      o();
    }), f = [];
  } };
})();
class ne {
  constructor(t, s) {
    b(this, "_hostElement");
    b(this, "_shadowRoot");
    b(this, "update");
    b(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = s;
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
}, $ = (e, t = null) => {
  const s = document.createElement("style");
  return s.innerHTML = e, t && t.appendChild(s), s;
}, ie = async (e, t) => {
  if (e = { ...re, ...e }, j(e.styles)) {
    const s = await e.styles;
    e.styles = s.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !E.isRootNodeSet)
    E.isRootNodeSet = !0, e.styles && (E.globalStyleTag = $(e.styles, document.head), E.globalStyles.replace(e.styles));
  else if (e.root && E.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(
    e.selector,
    class extends HTMLElement {
      constructor() {
        super();
        b(this, "klass");
        b(this, "shadow");
        b(this, "componentStyleTag", null);
        b(this, "internalSubscriptions", new X());
        b(this, "isEmulated", !1);
        b(this, "renderCount", 0);
        e.shadowDomEncapsulation && K ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = E.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      createProxyInstance() {
        const r = new ne(this, this.shadow);
        r.update = () => {
          this.update();
        }, r.emitEvent = (c, u) => {
          this.emitEvent(c, u);
        }, this.internalSubscriptions.add(
          te(this.setRenderIntoQueue, () => {
            this.klass = W(V(this.setRenderIntoQueue, t), e.deps, r);
          })
        );
      }
      update() {
        const r = this.klass.render();
        typeof r == "string" ? this.shadow.innerHTML = Z(r) : se(this.shadow, r);
      }
      emitEvent(r, c) {
        const u = new CustomEvent(r, {
          detail: c
        });
        this.dispatchEvent(u);
      }
      setProps(r) {
        var c, u;
        for (const [m, f] of Object.entries(r))
          t.observedProperties.find((p) => p === m) && (this.klass[m] = f);
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
        var r, c, u, m;
        if (this.isEmulated) {
          const f = O();
          this.setAttribute("data-did", f);
          const p = e.styles.replaceAll(":host", `${e.selector}[data-did='${f}']`);
          !e.root && p && (this.componentStyleTag = $(p, document.head));
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
        ), (c = (r = this.klass).beforeMount) == null || c.call(r), this.update(), (m = (u = this.klass).mount) == null || m.call(u);
      }
      attributeChangedCallback(r, c, u) {
        var m, f;
        (f = (m = this.klass).onAttributesChanged) == null || f.call(m, r, c, u);
      }
      disconnectedCallback() {
        var r, c, u;
        this.renderCount = 0, (c = (r = this.klass).unmount) == null || c.call(r), (u = this.componentStyleTag) == null || u.remove(), this.internalSubscriptions.unsubscribe();
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
  }, e.deps.some((r) => {
    var c;
    return ((c = r.prototype.__metadata__) == null ? void 0 : c.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = W(t, e.deps);
  N.register(t, s);
}, ge = (e, t) => {
  const s = typeof e == "string" ? { name: e } : e;
  return N.register(s, t), s;
};
class ae {
  constructor() {
    b(this, "transition", "");
    this.whichTransitionEnd();
  }
  onTransitionEnd(t, s, r) {
    let c = !1, u = null;
    const m = () => {
      c || (c = !0, s && s(), u(), u = null);
    };
    u = k(t, this.transition, () => {
      m();
    }), setTimeout(m, r);
  }
  animationsComplete(t) {
    return t.getAnimations ? Promise.allSettled(t.getAnimations().map((s) => s.finished)) : Promise.allSettled([!0]);
  }
  whichTransitionEnd() {
    const s = document.createElement("div").style, r = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "otransitionend"
    };
    for (const c in r)
      if (typeof s[c] < "u") {
        this.transition = r[c];
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
  ge as InjectionToken,
  N as Injector,
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
