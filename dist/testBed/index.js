"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var service_resolver_1 = require("../src/lib/service_resolver");
var TestBed = /** @class */ (function () {
    function TestBed() {
    }
    TestBed.MockComponent = function (target) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appRoot;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _waitForComponentToRender(target.prototype.selector)];
                    case 1:
                        appRoot = _a.sent();
                        return [2 /*return*/, appRoot];
                }
            });
        });
    };
    TestBed.MockService = function (name, target) {
        service_resolver_1.Injector.register(name, target);
        return service_resolver_1.Injector.get(name);
    };
    TestBed.RemoveComponent = function (node) {
        document.removeChild(node);
    };
    return TestBed;
}());
exports.TestBed = TestBed;
function _waitForComponentToRender(tag) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ele;
        return tslib_1.__generator(this, function (_a) {
            ele = document.createElement(tag);
            document.body.appendChild(ele);
            return [2 /*return*/, new Promise(function (resolve) {
                    function requestComponent() {
                        var element = document.querySelector(tag);
                        if (element) {
                            resolve(element);
                        }
                        else {
                            window.requestAnimationFrame(requestComponent);
                        }
                    }
                    requestComponent();
                })];
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0QmVkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUF1RDtBQUV2RDtJQUFBO0lBY0EsQ0FBQztJQWJjLHFCQUFhLEdBQTFCLFVBQTJCLE1BQWU7Ozs7OzRCQUMxQixxQkFBTSx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBcEUsT0FBTyxHQUFHLFNBQTBEO3dCQUN4RSxzQkFBTyxPQUFPLEVBQUM7Ozs7S0FDaEI7SUFFTSxtQkFBVyxHQUFsQixVQUFtQixJQUFXLEVBQUUsTUFBVTtRQUN4QywyQkFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsT0FBTywyQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sdUJBQWUsR0FBdEIsVUFBdUIsSUFBaUI7UUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksMEJBQU87QUFnQnBCLFNBQWUseUJBQXlCLENBQUMsR0FBVTs7OztZQUM3QyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixzQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU87b0JBQ3hCLFNBQVMsZ0JBQWdCO3dCQUN2QixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLE9BQU8sRUFBRTs0QkFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ2xCOzZCQUFNOzRCQUNMLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3lCQUNoRDtvQkFDSCxDQUFDO29CQUNELGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxFQUFDOzs7Q0FDSiJ9