var Q = Object.defineProperty;
var U = (e, t, r) => t in e ? Q(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var p = (e, t, r) => U(e, typeof t != "symbol" ? t + "" : t, r);
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
    p(this, "_callbackCollection", {});
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
    p(this, "_initialValue");
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
    p(this, "_subcribers", []);
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
    const b = f.querySelectorAll("script");
    for (const S of b)
      S.remove();
  }, s = (f, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (b.includes("javascript:") || b.includes("data:")) || f.startsWith("on")) return !0;
  }, c = (f) => {
    const b = f.attributes;
    for (const { name: S, value: A } of b)
      s(S, A) && f.removeAttribute(S);
  }, u = (f) => {
    const b = f.children;
    for (const S of b)
      c(S), u(S);
  }, m = t();
  return r(m), u(m), m.innerHTML;
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
}, D = (e) => typeof e == "function", R = {};
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
    } catch (m) {
      console.trace(m);
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
    p(this, "map", /* @__PURE__ */ new WeakMap());
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
}(), H = (e, t, r) => {
  if (t.length) {
    const s = [];
    for (const c of t)
      c.prototype.__metadata__.name !== "RENDERER" ? s.push(W.getService(c)) : s.push(r);
    return new e(...s);
  } else
    return new e();
}, E = new class {
  constructor() {
    p(this, "globalStyles");
    p(this, "style_registry");
    p(this, "isRootNodeSet");
    p(this, "globalStyleTag");
    p(this, "getComputedCss", (e = "", t) => {
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
  let m = [], f = [];
  const b = (n) => {
    const o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let i = JSON.stringify(n);
    const a = (d) => o[d] || d;
    return i = ((d) => d.replace(/[&<>()]/g, a))(i), JSON.parse(i);
  }, S = (n, o) => {
    const i = n.options, a = Array.isArray(o) ? o : [o];
    let h, d, l = i.length;
    for (; l--; ) {
      d = i[l];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = a.indexOf(g) > -1) && (h = !0);
    }
    h || (n.selectedIndex = -1);
  }, A = (n) => {
    const o = document.createElement("template");
    return o.innerHTML = n, o.content;
  }, N = (n, o, i) => {
    const a = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const h = new CustomEvent("bindprops", {
            detail: {
              props: o
            },
            bubbles: !1
          });
          n.dispatchEvent(h);
        }
      });
    };
    n[i] = JSON.stringify(o), f.push(a);
  }, P = (n, o, i) => {
    switch (!0) {
      case /attrs/.test(o): {
        const a = i.attrs;
        for (const h in a)
          P(n, h, a[h]);
        break;
      }
      case /^on+/.test(o): {
        const a = o.slice(2).toLowerCase();
        n.removeEventListener(a, i), n.addEventListener(a, i);
        break;
      }
      case /ref/.test(o): {
        const a = (function() {
          this.node.isConnected && this.fn(this.node);
        }).bind({ node: n, fn: i });
        m.push(a);
        break;
      }
      case /key/.test(o): {
        n[Symbol("key")] = i;
        break;
      }
      case /^data-+/.test(o):
      case /^aria-+/.test(o): {
        o === "data-input" ? N(n, i, Symbol("input")) : n.setAttribute(o, b(i));
        break;
      }
      case /class/.test(o): {
        i ? n.classList.add(...i.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(o): {
        n.nodeName.toLowerCase() === "select" ? S(n, i) : n.value = b(i);
        break;
      }
      case /disabled/.test(o):
      case /checked/.test(o): {
        i ? n.setAttribute(o, i) : n.removeAttribute(o);
        break;
      }
      default:
        n.setAttribute(o, b(i));
    }
  }, j = (n, o) => {
    const i = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let a = i.nextNode();
    for (; a; ) {
      if (a.hasAttributes()) {
        const h = Array.from(a.attributes).filter((d) => s.test(d.nodeName));
        for (const { nodeName: d, nodeValue: l } of h) {
          const g = s.exec(d)[1];
          P(a, l, o[g]), a.removeAttribute(d);
        }
      }
      a = i.nextNode();
    }
  }, z = (n, o) => {
    const i = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let a = i.nextNode(), h;
    for (; a; ) {
      if (h = u.exec(a.data)) {
        const d = Array.isArray(o[h[1]]) ? o[h[1]] : [o[h[1]]];
        a.replaceWith(...d), i.currentNode = n;
      }
      a = i.nextNode();
    }
  }, C = (n, o) => {
    if (!n)
      return [null, ""];
    const i = Object.getOwnPropertySymbols(n).find((h) => h.description === o), a = i ? n[i] : "";
    return [i, a];
  }, J = (n, o) => {
    if (!n || !o || n.nodeType !== 1 || o.nodeType !== 1) return;
    const i = n.attributes, a = o.attributes, h = o.getAttribute("data-preserve-attributes"), d = h && h === "true";
    for (const { name: l, value: g } of i)
      (!a[l] || a[l] !== g) && o.setAttribute(l, g);
    if (!d)
      for (const { name: l } of a)
        i[l] || o.removeAttribute(l);
    if (["input", "textarea"].includes(o.tagName.toLowerCase()) && (o.value = n.value), o.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const l = C(n, "input")[1], g = C(o, "input");
      l && g[1] && l !== g[1] && N(o, JSON.parse(l), g[0]);
    }
  }, L = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, v = (n, o, i) => {
    const a = o ? Array.from(o.childNodes) : [], h = n ? Array.from(n.childNodes) : [];
    let d = a.length - h.length;
    if (d > 0)
      for (; d > 0; d--)
        a[a.length - d].parentNode.removeChild(a[a.length - d]);
    h.forEach((l, g) => {
      const y = a[g], T = C(l, "key")[1], w = C(y, "key")[1];
      if (J(l, y), i && y && y.nodeType === 1 && y.tagName.indexOf("-") > -1)
        return;
      if (!y) {
        o && o.appendChild(l);
        return;
      }
      if (T && w && T !== w || L(l) !== L(y)) {
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
        const I = document.createDocumentFragment();
        v(l, I, !1), y.appendChild(I);
        return;
      }
      if (l.childNodes.length > 0) {
        v(l, y, !0);
        return;
      }
    });
  };
  return { html: (n, ...o) => {
    let i = "";
    const { length: a } = n;
    for (let d = 1; d < a; d++) {
      const l = o[d - 1];
      let g = !1;
      if (i += n[d - 1], e.test(i) && t.test(i) && (i = i.replace(
        e,
        (y, T, w) => `${r}${d - 1}=${w || '"'}${T}${w ? "" : '"'}`
      ), g = !0), !g)
        switch (!0) {
          case Array.isArray(l):
          case l instanceof DocumentFragment: {
            i += `<!--${c}${d - 1}-->`;
            break;
          }
          case (typeof l == "object" && l !== null): {
            "attrs" in l && (i += `${r}${d - 1}="attrs"`);
            break;
          }
          default:
            i += l ?? "";
        }
    }
    i += n[a - 1];
    const h = A(i.trim());
    return j(h, o), z(h, o), h;
  }, render: (n, o) => {
    n && !n.children.length ? (n.innerHTML = "", n.appendChild(o)) : v(o, n, !1), m.forEach((i) => {
      i();
    }), m = [], f.forEach((i) => {
      i();
    }), f = [];
  } };
})();
class ne {
  constructor(t, r) {
    p(this, "_hostElement");
    p(this, "_shadowRoot");
    p(this, "update");
    p(this, "emitEvent");
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
}, oe = async (e, t) => {
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
        p(this, "klass");
        p(this, "shadow");
        p(this, "componentStyleTag", null);
        p(this, "internalSubscriptions", new X());
        p(this, "isEmulated", !1);
        p(this, "renderCount", 0);
        p(this, "update", () => {
          const s = this.klass.render();
          typeof s == "string" ? this.shadow.innerHTML = Z(s) : se(this.shadow, s);
        });
        p(this, "getInstance", () => this.klass);
        p(this, "setRenderIntoQueue", () => {
          ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
            this.update(), this.renderCount = 0;
          });
        });
        e.shadowDomEncapsulation && K ? (this.isEmulated = !1, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.adoptedStyleSheets = E.getComputedCss(
          e.styles,
          e.standalone
        )) : (this.isEmulated = !1, this.shadow = this), this.createProxyInstance();
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
            this.klass = H(
              V(this.setRenderIntoQueue, t),
              e.deps,
              s
            );
          })
        );
      }
      emitEvent(s, c) {
        const u = new CustomEvent(s, {
          detail: c
        });
        this.dispatchEvent(u);
      }
      setProps(s) {
        var c, u;
        for (const [m, f] of Object.entries(s))
          t.observedProperties.find((b) => b === m) && (this.klass[m] = f);
        (u = (c = this.klass).onPropertiesChanged) == null || u.call(c);
      }
      connectedCallback() {
        var s, c, u, m;
        if (this.isEmulated) {
          const f = O();
          this.setAttribute("data-did", f);
          const b = e.styles.replaceAll(":host", `${e.selector}[data-did='${f}']`);
          !e.root && b && (this.componentStyleTag = F(b, document.head));
        }
        this.internalSubscriptions.add(
          k(this, "bindprops", (f) => {
            const b = f.detail.props;
            b && this.setProps(b);
          })
        ), this.internalSubscriptions.add(
          k(this, "refresh_component", () => {
            this.update();
          })
        ), this.internalSubscriptions.add(
          k(window, "onLanguageChange", () => {
            this.update();
          })
        ), (c = (s = this.klass).beforeMount) == null || c.call(s), this.update(), (m = (u = this.klass).mount) == null || m.call(u);
      }
      attributeChangedCallback(s, c, u) {
        var m, f;
        (f = (m = this.klass).onAttributesChanged) == null || f.call(m, s, c, u);
      }
      disconnectedCallback() {
        var s, c, u;
        this.renderCount = 0, (c = (s = this.klass).unmount) == null || c.call(s), (u = this.componentStyleTag) == null || u.remove(), this.internalSubscriptions.unsubscribe();
      }
    }
  );
}, ie = {
  deps: []
}, ye = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || (Object.defineProperty(t.prototype, "selector", {
    get() {
      return e.selector;
    }
  }), oe(e, t));
}, ce = (e = {}) => (t) => {
  if (e = { ...ie, ...e }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((s) => {
    var c;
    return ((c = s.prototype.__metadata__) == null ? void 0 : c.name) === "RENDERER";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const r = H(t, e.deps);
  W.register(t, r);
};
class ae {
  constructor() {
    p(this, "transition", "");
    this.whichTransitionEnd();
  }
  onTransitionEnd(t, r, s) {
    let c = !1, u = null;
    const m = () => {
      c || (c = !0, r && r(), u(), u = null);
    };
    u = k(t, this.transition, () => {
      m();
    }), setTimeout(m, s);
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
