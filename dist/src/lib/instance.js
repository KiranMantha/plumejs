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
        //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
        instance = new ((_a = $deps[0]).bind.apply(_a, tslib_1.__spreadArrays([void 0], $deps[1])))();
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUE2QjtBQUs3QixTQUFTLFdBQVcsQ0FBQyxFQUFXLEVBQUUsSUFBdUIsRUFBRSxLQUFjOztJQUF2QyxxQkFBQSxFQUFBLFNBQXVCO0lBQUUsc0JBQUEsRUFBQSxVQUFjO0lBQ3ZFLElBQUksS0FBSyxHQUFHLFVBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUMzQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLG1GQUFtRjtRQUNuRixRQUFRLFFBQU8sQ0FBQSxLQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxpREFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUMsQ0FBQztLQUN0QztTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDM0I7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBRVEsa0NBQVcifQ==