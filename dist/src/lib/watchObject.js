"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwatch = exports.watch = void 0;
let mapObj = new WeakMap();
const clone = (obj) => {
    if (null == obj || "object" != typeof obj) {
        return obj;
    }
    let copy = obj.constructor();
    for (let attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
};
const getExistingSetter = (obj, prop) => {
    let existingSetter = Object.getOwnPropertyDescriptor(obj, prop);
    return existingSetter ? existingSetter.set : undefined;
};
const getDiff = (a, b) => {
    if (!b)
        b = {};
    let changedProps = [];
    for (let prop in a) {
        if (!b[prop] || (a[prop] !== b[prop])) {
            changedProps.push(prop);
        }
    }
    if (changedProps.length === 0) {
        for (let prop in b) {
            if (!a[prop] || (b[prop] !== a[prop])) {
                changedProps.push(prop);
            }
        }
    }
    return changedProps;
};
class CreateWatch {
    constructor(obj, prop, handler) {
        this.interval = null;
        this._obj = null;
        this._actualValue = null;
        this._clonedValue = null;
        this._handler = null;
        this.defineProp(obj, prop, handler);
        obj['objVal'] = null;
        this._obj = obj;
        this._actualValue = obj[prop];
        this._clonedValue = obj[prop];
        this._watchableProp = prop;
        this._handler = handler;
    }
    dirtyWatch() {
        this.interval = setInterval(() => {
            this._actualValue = this._obj[this._watchableProp];
            let diffObj = getDiff(this._actualValue, this._clonedValue);
            if (diffObj.length > 0) {
                this._handler(this._clonedValue, this._actualValue);
                this._clonedValue = clone(this._actualValue);
            }
        }, 50);
    }
    defineProp(obj, prop, handler) {
        let _this = this;
        const getter = () => {
            return obj['objVal'];
        };
        const existingSetter = getExistingSetter(obj, prop);
        const setter = (value) => {
            let _oldval = clone(obj['objVal']);
            _this._actualValue = clone(value);
            handler(_oldval, value);
            obj['objVal'] = value;
        };
        Object.defineProperty(obj, prop, {
            get: getter,
            set: function (newVal) {
                setter.call(this, newVal);
                if (existingSetter) {
                    existingSetter(newVal);
                }
            },
            enumerable: true,
            configurable: true
        });
    }
    unwatch() {
        this.interval && clearInterval(this.interval);
        delete this._obj[this._watchableProp];
        delete this._obj['objVal'];
        this._actualValue = null;
        this._clonedValue = null;
    }
}
const watch = (obj, prop, handler) => {
    if (!mapObj.has(obj)) {
        let watcher = new CreateWatch(obj, prop, handler);
        mapObj.set(obj, watcher);
        watcher.dirtyWatch();
    }
};
exports.watch = watch;
const unwatch = (obj) => {
    if (mapObj.has(obj)) {
        let watcher = mapObj.get(obj);
        watcher.unwatch();
        mapObj.delete(obj);
    }
};
exports.unwatch = unwatch;
