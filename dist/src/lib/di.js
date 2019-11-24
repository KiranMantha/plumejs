"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const service_resolver_1 = require("./service_resolver");
const setDI = (fn, deps, props) => {
    let di = [], finalArr = [], func_deps = deps && utils_1.isArray(deps) ? deps : [];
    if (func_deps.length > 0) {
        utils_1.foreach(func_deps, (o, i) => {
            if (o !== 'props') {
                let depsrvc = service_resolver_1.Injector.get(o);
                if (depsrvc) {
                    let k = depsrvc;
                    di.push(k);
                }
            }
        });
    }
    finalArr = [fn, di];
    return finalArr;
};
exports.setDI = setDI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTJDO0FBQzNDLHlEQUE4QztBQUU5QyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQVcsRUFBRSxJQUFrQixFQUFFLEtBQVMsRUFBYSxFQUFFO0lBQ3RFLElBQUksRUFBRSxHQUFjLEVBQUUsRUFDcEIsUUFBUSxHQUFHLEVBQUUsRUFDYixTQUFTLEdBQUcsSUFBSSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QixlQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBSyxFQUFFLENBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxPQUFPLEdBQUcsMkJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksT0FBTyxFQUFFO29CQUNYLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDaEIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDWjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFUSxzQkFBSyJ9