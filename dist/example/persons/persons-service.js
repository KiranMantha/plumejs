"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../../index");
var PersonService = /** @class */ (function () {
    function PersonService() {
    }
    PersonService.prototype.getPersons = function () {
        return fetch("https://jsonplaceholder.typicode.com/users").then(function (res) {
            return res.json();
        });
    };
    PersonService = tslib_1.__decorate([
        index_1.Injectable()
    ], PersonService);
    return PersonService;
}());
exports.default = PersonService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBeUM7QUFHekM7SUFBQTtJQU1BLENBQUM7SUFMQSxrQ0FBVSxHQUFWO1FBQ0MsT0FBTyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ2xFLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRTtRQUFWLENBQVUsQ0FDVixDQUFDO0lBQ0gsQ0FBQztJQUxtQixhQUFhO1FBRGpDLGtCQUFVLEVBQUU7T0FDUSxhQUFhLENBTWpDO0lBQUQsb0JBQUM7Q0FBQSxBQU5ELElBTUM7a0JBTm9CLGFBQWEifQ==