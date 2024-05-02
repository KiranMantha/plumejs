var z = Object.defineProperty;
var J = (e, t, s) => t in e ? z(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var b = (e, t, s) => (J(e, typeof t != "symbol" ? t + "" : t, s), s);
const U = (e) => !!e && typeof e.subscribe == "function", $ = (e) => !!e && typeof e.then == "function", q = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), K = (e) => ({
  subscribe: (t) => {
    t(e);
  }
}), B = (e) => ({
  subscribe: (t) => {
    Promise.resolve(e).then((s) => {
      t(s);
    });
  }
}), O = () => Math.random().toString(36).substring(2);
class Y {
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
class he extends Y {
  constructor(s) {
    super();
    b(this, "_initialValue");
    this._initialValue = s;
  }
  subscribe(s) {
    const i = super.subscribe(s);
    return super.next(this._initialValue), i;
  }
  next(s) {
    this._initialValue = s, super.next(s);
  }
}
class G {
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
const fe = (e) => U(e) ? e : $(e) ? B(Promise.resolve(e)) : K(e), k = (e, t, s, i = !1) => (e.addEventListener(t, s, i), () => {
  e.removeEventListener(t, s, i);
}), X = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), s = (f) => {
    const p = f.querySelectorAll("script");
    for (const S of p)
      S.remove();
  }, i = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, c = (f) => {
    const p = f.attributes;
    for (const { name: S, value: v } of p)
      i(S, v) && f.removeAttribute(S);
  }, d = (f) => {
    const p = f.children;
    for (const S of p)
      c(S), d(S);
  }, m = t();
  return s(m), d(m), m.innerHTML;
}, Z = (e, t) => {
  const s = () => ({
    get(i, c) {
      const d = Object.prototype.toString.call(i[c]);
      return ["[object Object]", "[object Array]"].indexOf(d) > -1 && !("__metadata__" in i[c]) ? new Proxy(i[c], s()) : i[c];
    },
    set(i, c, d) {
      return i[c] = d, e(), !0;
    }
  });
  return class extends t {
    constructor(...i) {
      return super(...i), new Proxy(this, s());
    }
  };
}, pe = () => {
  let e;
  return [new Promise((s) => {
    e = s;
  }), e];
}, V = (e) => typeof e == "function", R = /* @__PURE__ */ Object.create(null);
let _ = null;
function ee(e, t) {
  const s = _;
  let i;
  _ = O(), R[_] = e;
  try {
    t();
  } finally {
    i = _, _ = s;
  }
  return i;
}
function be(e) {
  const t = R[_];
  let s = e;
  function i() {
    return s;
  }
  return i.set = function(c) {
    V(c) ? s = c(s) : s = c;
    try {
      t();
    } catch {
    }
  }, i;
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
}(), j = (e, t, s) => {
  if (t.length) {
    const i = [];
    for (const c of t)
      c.prototype.__metadata__.name !== "RENDERER" ? i.push(N.getService(c)) : i.push(s);
    return new e(...i);
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
      const i = new CSSStyleSheet();
      if (i.insertRule(":host { display: block; }"), s = t ? [i] : [this.globalStyles, i], e) {
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
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, s = "attr", i = /^attr([^ ]+)/, c = "insertNode", d = /^insertNode([^ ]+)/;
  let m = [], f = [];
  const p = (n) => {
    const r = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const a = (u) => r[u] || u;
    return o = ((u) => u.replace(/[&<>\(\)]/g, a))(o), JSON.parse(o);
  }, S = (n, r) => {
    const o = n.options, a = Array.isArray(r) ? r : [r];
    let h, u, l = o.length;
    for (; l--; ) {
      u = o[l];
      const g = u.getAttribute("value") ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (u.selected = a.indexOf(g) > -1) && (h = !0);
    }
    h || (n.selectedIndex = -1);
  }, v = (n) => {
    const r = document.createElement("template");
    return r.innerHTML = n, r.content;
  }, P = (n, r, o) => {
    const a = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const h = new CustomEvent("bindprops", {
            detail: {
              props: r
            },
            bubbles: !1
          });
          n.dispatchEvent(h);
        }
      });
    };
    n[o] = JSON.stringify(r), f.push(a);
  }, L = (n, r, o) => {
    switch (!0) {
      case /attrs/.test(r): {
        const a = o.attrs;
        for (const h in a)
          L(n, h, a[h]);
        break;
      }
      case /^on+/.test(r): {
        const a = r.slice(2).toLowerCase();
        n.removeEventListener(a, o), n.addEventListener(a, o);
        break;
      }
      case /ref/.test(r): {
        const a = (function() {
          this.node.isConnected && this.fn(this.node);
        }).bind({ node: n, fn: o });
        m.push(a);
        break;
      }
      case /key/.test(r): {
        n[Symbol("key")] = o;
        break;
      }
      case /^data-+/.test(r):
      case /^aria-+/.test(r): {
        r === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(r, p(o));
        break;
      }
      case /class/.test(r): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(r): {
        n.nodeName.toLowerCase() === "select" ? S(n, o) : n.value = p(o);
        break;
      }
      case /disabled/.test(r):
      case /checked/.test(r): {
        o ? n.setAttribute(r, o) : n.removeAttribute(r);
        break;
      }
      default:
        n.setAttribute(r, p(o));
    }
  }, W = (n, r) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let a = o.nextNode();
    for (; a; ) {
      if (a.hasAttributes()) {
        const h = Array.from(a.attributes).filter((u) => i.test(u.nodeName));
        for (const { nodeName: u, nodeValue: l } of h) {
          const g = i.exec(u)[1];
          L(a, l, r[g]), a.removeAttribute(u);
        }
      }
      a = o.nextNode();
    }
  }, H = (n, r) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let a = o.nextNode(), h;
    for (; a; ) {
      if (h = d.exec(a.data)) {
        const u = Array.isArray(r[h[1]]) ? r[h[1]] : [r[h[1]]];
        a.replaceWith(...u), o.currentNode = n;
      }
      a = o.nextNode();
    }
  }, C = (n, r) => {
    if (!n)
      return [null, ""];
    const o = Object.getOwnPropertySymbols(n).find((h) => h.description === r), a = o ? n[o] : "";
    return [o, a];
  }, Q = (n, r) => {
    if (!n || !r || n.nodeType !== 1 || r.nodeType !== 1)
      return;
    const o = n.attributes, a = r.attributes, h = r.getAttribute("data-preserve-attributes"), u = h && h === "true";
    for (const { name: l, value: g } of o)
      (!a[l] || a[l] !== g) && r.setAttribute(l, g);
    if (!u)
      for (const { name: l } of a)
        o[l] || r.removeAttribute(l);
    if (["input", "textarea"].includes(r.tagName.toLowerCase()) && (r.value = n.value), r.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const l = C(n, "input")[1], g = C(r, "input");
      l && g[1] && l !== g[1] && P(r, JSON.parse(l), g[0]);
    }
  }, I = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, A = (n, r, o) => {
    const a = r ? Array.from(r.childNodes) : [], h = n ? Array.from(n.childNodes) : [];
    let u = a.length - h.length;
    if (u > 0)
      for (; u > 0; u--)
        a[a.length - u].parentNode.removeChild(a[a.length - u]);
    h.forEach((l, g) => {
      const y = a[g], T = C(l, "key")[1], w = C(y, "key")[1];
      if (Q(l, y), o && y && y.nodeType === 1 && y.tagName.indexOf("-") > -1)
        return;
      if (!y) {
        r && r.appendChild(l);
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
  return { html: (n, ...r) => {
    let o = "";
    const { length: a } = n;
    for (let u = 1; u < a; u++) {
      const l = r[u - 1];
      let g = !1;
      if (o += n[u - 1], e.test(o) && t.test(o) && (o = o.replace(
        e,
        (y, T, w) => `${s}${u - 1}=${w || '"'}${T}${w ? "" : '"'}`
      ), g = !0), !g)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            o += `<!--${c}${u - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (o += `${s}${u - 1}="attrs"`);
            break;
          }
          default:
            o += l || "";
        }
    }
    o += n[a - 1];
    const h = v(o.trim());
    return W(h, r), H(h, r), h;
  }, render: (n, r) => {
    n && !n.children.length ? (n.innerHTML = "", n.appendChild(r)) : A(r, n, !1), m.forEach((o) => {
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
}, F = (e, t = null) => {
  const s = document.createElement("style");
  return s.innerHTML = e, t && t.appendChild(s), s;
}, ie = async (e, t) => {
  if (e = { ...re, ...e }, $(e.styles)) {
    const s = await e.styles;
    e.styles = s.default.toString();
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
        b(this, "klass");
        b(this, "shadow");
        b(this, "componentStyleTag", null);
        b(this, "internalSubscriptions", new G());
        b(this, "isEmulated", !1);
        b(this, "renderCount", 0);
        e.shadowDomEncapsulation && q ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = E.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), this.createProxyInstance();
      }
      static get observedAttributes() {
        return t.observedAttributes || [];
      }
      createProxyInstance() {
        const i = new ne(this, this.shadow);
        i.update = () => {
          this.update();
        }, i.emitEvent = (c, d) => {
          this.emitEvent(c, d);
        }, this.internalSubscriptions.add(
          te(this.setRenderIntoQueue, () => {
            this.klass = j(Z(this.setRenderIntoQueue, t), e.deps, i);
          })
        );
      }
      update() {
        const i = this.klass.render();
        typeof i == "string" ? this.shadow.innerHTML = X(i) : se(this.shadow, i);
      }
      emitEvent(i, c) {
        const d = new CustomEvent(i, {
          detail: c
        });
        this.dispatchEvent(d);
      }
      setProps(i) {
        var c, d;
        for (const [m, f] of Object.entries(i))
          t.observedProperties.find((p) => p === m) && (this.klass[m] = f);
        (d = (c = this.klass).onPropertiesChanged) == null || d.call(c);
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
        var i, c, d, m;
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
        ), (c = (i = this.klass).beforeMount) == null || c.call(i), this.update(), (m = (d = this.klass).mount) == null || m.call(d);
      }
      attributeChangedCallback(i, c, d) {
        var m, f;
        (f = (m = this.klass).onAttributesChanged) == null || f.call(m, i, c, d);
      }
      disconnectedCallback() {
        var i, c, d;
        this.renderCount = 0, (c = (i = this.klass).unmount) == null || c.call(i), (d = this.componentStyleTag) == null || d.remove(), this.internalSubscriptions.unsubscribe();
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
  }, e.deps.some((i) => {
    var c;
    return ((c = i.prototype.__metadata__) == null ? void 0 : c.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = j(t, e.deps);
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
  onTransitionEnd(t, s, i) {
    let c = !1, d = null;
    const m = () => {
      c || (c = !0, s && s(), d(), d = null);
    };
    d = k(t, this.transition, () => {
      m();
    }), setTimeout(m, i);
  }
  animationsComplete(t) {
    return t.getAnimations ? Promise.allSettled(t.getAnimations().map((s) => s.finished)) : Promise.allSettled([!0]);
  }
  whichTransitionEnd() {
    const s = document.createElement("div").style, i = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "otransitionend"
    };
    for (const c in i)
      if (typeof s[c] < "u") {
        this.transition = i[c];
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
  Y as SubjectObs,
  G as Subscriptions,
  k as fromEvent,
  me as html,
  pe as promisify,
  se as render,
  be as signal,
  fe as wrapIntoObservable
};
