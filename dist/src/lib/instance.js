"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("./di");
function instantiate(fn, deps = [], props = {}) {
    let $deps = di_1.setDI(fn, deps, props), instance;
    if ($deps[1].length > 0) {
        instance = new $deps[0](...$deps[1]);
    }
    else {
        instance = new $deps[0]();
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBSzdCLFNBQVMsV0FBVyxDQUFDLEVBQVcsRUFBRSxPQUFxQixFQUFFLEVBQUUsUUFBWSxFQUFFO0lBQ3ZFLElBQUksS0FBSyxHQUFHLFVBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUMzQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBRXZCLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO1NBQU07UUFDTCxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMzQjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFUSxrQ0FBVyJ9