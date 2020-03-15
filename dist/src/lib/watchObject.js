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
const unwatch = (obj) => {
    if (mapObj.has(obj)) {
        let watcher = mapObj.get(obj);
        watcher.unwatch();
        mapObj.delete(obj);
    }
};
export { watch, unwatch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dhdGNoT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFFM0IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFlLEVBQUUsRUFBRTtJQUNqQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLE9BQU8sR0FBRyxFQUFFO1FBQzFDLE9BQU8sR0FBRyxDQUFDO0tBQ1g7SUFDRCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRTtJQUN2RCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFhLEVBQUUsQ0FBYSxFQUFFLEVBQUU7SUFDL0MsSUFBRyxDQUFDLENBQUM7UUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1FBQ25CLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtB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