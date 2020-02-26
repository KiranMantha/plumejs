import { Injectable } from "../../index";

@Injectable()
export default class PersonService {
	getPersons() {
		return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
			res.json()
		);
	}
}