"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const augmentor_1 = require("augmentor");
const getTargetValue = (target) => {
    let targetValue;
    switch (target.nodeName.toLowerCase()) {
        case "input":
        case "textarea": {
            let nonTextElements = ["radio", "checkbox"];
            if (nonTextElements.includes(target.type)) {
                targetValue = target.checked
                    ? target.value !== null && target.value !== "on"
                        ? target.value
                        : true
                    : false;
            }
            else {
                targetValue = target.value;
            }
            break;
        }
        case "select": {
            let one = target.type === "select-one";
            if (one) {
                targetValue = target.value;
            }
            else {
                let options = Array.apply(null, target.options);
                targetValue = [...options]
                    .filter((option) => option.selected)
                    .map((option) => option.value);
            }
            break;
        }
    }
    return targetValue;
};
function useFormFields(initialValues) {
    let [formFields, setFormFields] = augmentor_1.useState(initialValues);
    const createChangeHandler = (key) => (e) => {
        let target = e.target;
        const value = getTargetValue(target);
        setFormFields(() => {
            formFields[key] = value;
            return formFields;
        });
    };
    return { formFields, createChangeHandler };
}
exports.useFormFields = useFormFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRm9ybUZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaG9va3MvdXNlRm9ybUZpZWxkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFxQztBQUVyQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQW1CLEVBQUUsRUFBRTtJQUM5QyxJQUFJLFdBQVcsQ0FBQztJQUNoQixRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDdEMsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ2hCLElBQUksZUFBZSxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBRSxNQUEyQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoRSxXQUFXLEdBQUksTUFBMkIsQ0FBQyxPQUFPO29CQUNqRCxDQUFDLENBQUUsTUFBMkIsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFLLE1BQTJCLENBQUMsS0FBSyxLQUFLLElBQUk7d0JBQzNGLENBQUMsQ0FBRSxNQUEyQixDQUFDLEtBQUs7d0JBQ3BDLENBQUMsQ0FBQyxJQUFJO29CQUNQLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDVDtpQkFBTTtnQkFDTixXQUFXLEdBQUksTUFBMkIsQ0FBQyxLQUFLLENBQUM7YUFDakQ7WUFDRCxNQUFNO1NBQ047UUFDRCxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxHQUFHLEdBQUksTUFBNEIsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDO1lBQzlELElBQUksR0FBRyxFQUFFO2dCQUNSLFdBQVcsR0FBSSxNQUE0QixDQUFDLEtBQUssQ0FBQzthQUNsRDtpQkFBTTtnQkFDTixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRyxNQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RSxXQUFXLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztxQkFDeEIsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO3FCQUNuQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztZQUNELE1BQU07U0FDTjtLQUNEO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsYUFBYSxDQUFJLGFBQWdCO0lBQ2hELElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsb0JBQVEsQ0FBSSxhQUFhLENBQUMsQ0FBQztJQUM3RCxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQVEsRUFBRSxFQUFFO1FBQzFELElBQUksTUFBTSxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLGFBQWEsQ0FBQyxHQUFHLEVBQUU7WUFDbEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFPLFVBQVUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUNGLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUM1QyxDQUFDO0FBWEQsc0NBV0MifQ==