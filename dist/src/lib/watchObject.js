"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dhdGNoT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUUzQixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQWUsRUFBRSxFQUFFO0lBQ2pDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLElBQUksT0FBTyxHQUFHLEVBQUU7UUFDMUMsT0FBTyxHQUFHLENBQUM7S0FDWDtJQUNELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ3ZELElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQWEsRUFBRSxDQUFhLEVBQUUsRUFBRTtJQUMvQyxJQUFHLENBQUMsQ0FBQztRQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDdEIsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMs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