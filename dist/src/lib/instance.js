"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("./di");
const augmentor_1 = require("augmentor");
const wrapper = (fn, deps, props) => {
    return () => {
        let $deps = di_1.setDI(fn, deps, props), instance;
        if ($deps[1].length > 0) {
            //es5 for spread operator: (deps[0].bind.apply(deps[0], [void 0].concat(deps[1])));
            instance = new $deps[0](...$deps[1]);
        }
        else {
            instance = new $deps[0]();
        }
        return instance;
    };
};
function instantiate(fn, deps = [], props = {}) {
    let instance = augmentor_1.augmentor(wrapper(fn, deps, props))();
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLHlDQUFzQztBQUV0QyxNQUFNLE9BQU8sR0FBRyxDQUFDLEVBQVksRUFBRSxJQUFtQixFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ2pFLE9BQU8sR0FBRyxFQUFFO1FBQ1QsSUFBSSxLQUFLLEdBQUcsVUFBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDO1FBQzdDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsbUZBQW1GO1lBQ25GLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUMzQjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLFNBQVMsV0FBVyxDQUFDLEVBQVcsRUFBRSxPQUFxQixFQUFFLEVBQUUsUUFBWSxFQUFFO0lBQ3ZFLElBQUksUUFBUSxHQUFHLHFCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3JELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFUSxrQ0FBVyJ9