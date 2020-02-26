import { Router } from "../../index";
import PersonService from './persons-service';
import './person-details';
declare class PersonsList {
    private personSrvc;
    private router;
    data: Array<string>;
    persondetails: any;
    update: any;
    element: any;
    constructor(personSrvc: PersonService, router: Router);
    mount(): void;
    alertName(user: any): void;
    render(): import("lighterhtml").Hole;
}
export default PersonsList;
