"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const augmentor_1 = require("augmentor");
const getTargetValue = (target) => {
    let targetValue;
    switch (target.nodeName && target.nodeName.toLowerCase()) {
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
        default: {
            targetValue = target.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlRm9ybUZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaG9va3MvdXNlRm9ybUZpZWxkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFxQztBQUVyQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQW1CLEVBQUUsRUFBRTtJQUM5QyxJQUFJLFdBQVcsQ0FBQztJQUNoQixRQUFRLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUN6RCxLQUFLLE9BQU8sQ0FBQztRQUNiLEtBQUssVUFBVSxDQUFDLENBQUM7WUFDaEIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDNUMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFFLE1BQTJCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hFLFdBQVcsR0FBSSxNQUEyQixDQUFDLE9BQU87b0JBQ2pELENBQUMsQ0FBRSxNQUEyQixDQUFDLEtBQUssS0FBSyxJQUFJLElBQUssTUFBMkIsQ0FBQyxLQUFLLEtBQUssSUFBSTt3QkFDM0YsQ0FBQyxDQUFFLE1BQTJCLENBQUMsS0FBSzt3QkFDcEMsQ0FBQyxDQUFDLElBQUk7b0JBQ1AsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNUO2lCQUFNO2dCQUNOLFdBQVcsR0FBSSxNQUEyQixDQUFDLEtBQUssQ0FBQzthQUNqRDtZQUNELE1BQU07U0FDTjtRQUNELEtBQUssUUFBUSxDQUFDLENBQUM7WUFDZCxJQUFJLEdBQUcsR0FBSSxNQUE0QixDQUFDLElBQUksS0FBSyxZQUFZLENBQUM7WUFDOUQsSUFBSSxHQUFHLEVBQUU7Z0JBQ1IsV0FBVyxHQUFJLE1BQTRCLENBQUMsS0FBSyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNOLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFHLE1BQTRCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZFLFdBQVcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO3FCQUN4QixNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7cUJBQ25DLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsTUFBTTtTQUNOO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUixXQUFXLEdBQUksTUFBYyxDQUFDLEtBQUssQ0FBQztZQUNwQyxNQUFNO1NBQ047S0FDRDtJQUNELE9BQU8sV0FBVyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLFNBQWdCLGFBQWEsQ0FBSSxhQUFnQjtJQUNoRCxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxHQUFHLG9CQUFRLENBQUksYUFBYSxDQUFDLENBQUM7SUFDN0QsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtRQUMxRCxJQUFJLE1BQU0sR0FBUSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxhQUFhLENBQUMsR0FBRyxFQUFFO1lBQ2xCLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDeEIsT0FBTyxVQUFVLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFDRixPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUM7QUFDNUMsQ0FBQztBQVhELHNDQVdDIn0=