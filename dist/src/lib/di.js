"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_resolver_1 = require("./service_resolver");
const setDI = (fn, deps, props) => {
    let di = [], finalArr = [], func_deps = deps && deps.length > 0 ? deps : [];
    if (func_deps.length > 0) {
        func_deps.map((o) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQThDO0FBRTlDLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVyxFQUFFLElBQWtCLEVBQUUsS0FBUyxFQUFhLEVBQUU7SUFDdEUsSUFBSSxFQUFFLEdBQWMsRUFBRSxFQUNwQixRQUFRLEdBQUcsRUFBRSxFQUNiLFNBQVMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2xELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDeEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxPQUFPLEdBQUcsMkJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksT0FBTyxFQUFFO29CQUNYLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDaEIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDWjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFUSxzQkFBSyJ9