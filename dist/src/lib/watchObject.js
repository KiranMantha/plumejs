"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapObj = new WeakMap();
var clone = function (obj) {
    if (null == obj || "object" != typeof obj) {
        return obj;
    }
    var copy = obj.constructor();
    for (var attr in obj) {
        copy[attr] = obj[attr];
    }
    return copy;
};
var getExistingSetter = function (obj, prop) {
    var existingSetter = Object.getOwnPropertyDescriptor(obj, prop);
    return existingSetter ? existingSetter.set : undefined;
};
var getDiff = function (a, b) {
    if (!b)
        b = {};
    var changedProps = [];
    for (var prop in a) {
        if (!b[prop] || (a[prop] !== b[prop])) {
            changedProps.push(prop);
        }
    }
    if (changedProps.length === 0) {
        for (var prop in b) {
            if (!a[prop] || (b[prop] !== a[prop])) {
                changedProps.push(prop);
            }
        }
    }
    return changedProps;
};
var CreateWatch = /** @class */ (function () {
    function CreateWatch(obj, prop, handler) {
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
    CreateWatch.prototype.dirtyWatch = function () {
        var _this_1 = this;
        this.interval = setInterval(function () {
            _this_1._actualValue = _this_1._obj[_this_1._watchableProp];
            var diffObj = getDiff(_this_1._actualValue, _this_1._clonedValue);
            if (diffObj.length > 0) {
                _this_1._handler(_this_1._clonedValue, _this_1._actualValue);
                _this_1._clonedValue = clone(_this_1._actualValue);
            }
        }, 50);
    };
    CreateWatch.prototype.defineProp = function (obj, prop, handler) {
        var _this = this;
        var getter = function () {
            return obj['objVal'];
        };
        var existingSetter = getExistingSetter(obj, prop);
        var setter = function (value) {
            var _oldval = clone(obj['objVal']);
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
    };
    CreateWatch.prototype.unwatch = function () {
        this.interval && clearInterval(this.interval);
        delete this._obj[this._watchableProp];
        delete this._obj['objVal'];
        this._actualValue = null;
        this._clonedValue = null;
    };
    return CreateWatch;
}());
var watch = function (obj, prop, handler) {
    if (!mapObj.has(obj)) {
        var watcher = new CreateWatch(obj, prop, handler);
        mapObj.set(obj, watcher);
        watcher.dirtyWatch();
    }
};
exports.watch = watch;
var unwatch = function (obj) {
    if (mapObj.has(obj)) {
        var watcher = mapObj.get(obj);
        watcher.unwatch();
        mapObj.delete(obj);
    }
};
exports.unwatch = unwatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3dhdGNoT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUUzQixJQUFNLEtBQUssR0FBRyxVQUFDLEdBQWU7SUFDN0IsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxPQUFPLEdBQUcsRUFBRTtRQUMxQyxPQUFPLEdBQUcsQ0FBQztLQUNYO0lBQ0QsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLElBQU0saUJBQWlCLEdBQUcsVUFBQyxHQUFXLEVBQUUsSUFBWTtJQUNuRCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQUcsVUFBQyxDQUFhLEVBQUUsQ0FBYTtJQUMzQyxJQUFHLENBQUMsQ0FBQztRQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDdEIsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMs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