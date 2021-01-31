import { Subject } from "rxjs";
import { Injectable } from "./decorators";

const registerInternaltranslationService = () => {
	@Injectable()
	class InternalTranslationService {
		updateTranslations = new Subject();
	}
};

export { registerInternaltranslationService };
