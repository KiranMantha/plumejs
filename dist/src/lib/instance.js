"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("./di");
function instantiate(fn, deps = [], props = {}) {
    let $deps = di_1.setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
        instance = new $deps[0](...$deps[1]);
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRTdCLFNBQVMsV0FBVyxDQUFDLEVBQVcsRUFBRSxPQUFxQixFQUFFLEVBQUUsUUFBWSxFQUFFO0lBQ3ZFLElBQUksS0FBSyxHQUFHLFVBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUM3QyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLG1GQUFtRjtRQUNuRixRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QztTQUFNO1FBQ0wsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDM0I7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBRVEsa0NBQVcifQ==