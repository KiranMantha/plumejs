import { __decorate } from "tslib";
import { Injectable } from "../../index";
let PersonService = class PersonService {
    getPersons() {
        return fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    }
};
PersonService = __decorate([
    Injectable()
], PersonService);
export default PersonService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29ucy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZS9wZXJzb25zL3BlcnNvbnMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd6QyxJQUFxQixhQUFhLEdBQWxDLE1BQXFCLGFBQWE7SUFDakMsVUFBVTtRQUNULE9BQU8sS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ3JFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FDVixDQUFDO0lBQ0gsQ0FBQztDQUNELENBQUE7QUFOb0IsYUFBYTtJQURqQyxVQUFVLEVBQUU7R0FDUSxhQUFhLENBTWpDO2VBTm9CLGFBQWEifQ==