"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var di_1 = require("./di");
function instantiate(fn, deps, props) {
    var _a;
    if (deps === void 0) { deps = []; }
    if (props === void 0) { props = {}; }
    var $deps = di_1.setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        instance = new ((_a = $deps[0]).bind.apply(_a, tslib_1.__spreadArrays([void 0], $deps[1])))();
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUE2QjtBQUU3QixTQUFTLFdBQVcsQ0FBQyxFQUFXLEVBQUUsSUFBdUIsRUFBRSxLQUFjOztJQUF2QyxxQkFBQSxFQUFBLFNBQXVCO0lBQUUsc0JBQUEsRUFBQSxVQUFjO0lBQ3ZFLElBQUksS0FBSyxHQUFHLFVBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUM3QyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBRXZCLFFBQVEsUUFBTyxDQUFBLEtBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBLGlEQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBQyxDQUFDO0tBQ3RDO1NBQU07UUFDTCxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMzQjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFUSxrQ0FBVyJ9