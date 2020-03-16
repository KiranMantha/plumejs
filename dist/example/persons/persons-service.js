"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
let PersonService = class PersonService {
    getPersons() {
        return fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    }
};
PersonService = tslib_1.__decorate([
    index_1.Injectable()
], PersonService);
exports.default = PersonService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBeUM7QUFHekMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFhO0lBQ2pDLFVBQVU7UUFDVCxPQUFPLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNyRSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQ1YsQ0FBQztJQUNILENBQUM7Q0FDRCxDQUFBO0FBTm9CLGFBQWE7SUFEakMsa0JBQVUsRUFBRTtHQUNRLGFBQWEsQ0FNakM7a0JBTm9CLGFBQWEifQ==