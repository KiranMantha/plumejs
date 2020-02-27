"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_resolver_1 = require("./service_resolver");
var setDI = function (fn, deps, props) {
    var di = [], finalArr = [], func_deps = deps && deps.length > 0 ? deps : [];
    if (func_deps.length > 0) {
        func_deps.map(function (o) {
            if (o !== 'props') {
                var depsrvc = service_resolver_1.Injector.get(o);
                if (depsrvc) {
                    var k = depsrvc;
                    di.push(k);
                }
            }
        });
    }
    finalArr = [fn, di];
    return finalArr;
};
exports.setDI = setDI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQThDO0FBRTlDLElBQU0sS0FBSyxHQUFHLFVBQUMsRUFBVyxFQUFFLElBQWtCLEVBQUUsS0FBUztJQUN2RCxJQUFJLEVBQUUsR0FBYyxFQUFFLEVBQ3BCLFFBQVEsR0FBRyxFQUFFLEVBQ2IsU0FBUyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QixTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBUTtZQUNyQixJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUU7Z0JBQ2pCLElBQUksT0FBTyxHQUFHLDJCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE9BQU8sRUFBRTtvQkFDWCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ2hCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ1o7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEIsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBRVEsc0JBQUsifQ==