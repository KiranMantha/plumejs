import { useState } from "augmentor";

const getTargetValue = (target: HTMLElement) => {
	let targetValue;
	switch (target.nodeName && target.nodeName.toLowerCase()) {
		case "input":
		case "textarea": {
			let nonTextElements = ["radio", "checkbox"];
			if (nonTextElements.includes((target as HTMLInputElement).type)) {
				targetValue = (target as HTMLInputElement).checked
					? (target as HTMLInputElement).value !== null && (target as HTMLInputElement).value !== "on"
						? (target as HTMLInputElement).value
						: true
					: false;
			} else {
				targetValue = (target as HTMLInputElement).value;
			}
			break;
		}
		case "select": {
			let one = (target as HTMLSelectElement).type === "select-one";
			if (one) {
				targetValue = (target as HTMLSelectElement).value;
			} else {
				let options = Array.apply(null, (target as HTMLSelectElement).options);
				targetValue = [...options]
					.filter((option) => option.selected)
					.map((option) => option.value);
			}
			break;
		}
		default: {
			targetValue = (target as any).value;
			break;
		}
	}
	return targetValue;
};

export function useFormFields<T>(initialValues: T) {
	let [formFields, setFormFields] = useState<T>(initialValues);
	const createChangeHandler = (key: keyof T) => (e: Event) => {
		let target: any = e.target;
		const value = getTargetValue(target);
		setFormFields(() => {
			formFields[key] = value;
			return formFields;
		});
	};
	return { formFields, createChangeHandler };
}
