"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormBuilder {
    constructor(Form, FormFields) {
        this._fieldOptions = FormFields;
        this._form = Form.current;
    }
    patchValue(FormName, value) {
        //this._form.elements.namedItem(FormName).value = value;
    }
    setValue({ FormName: string, value: any }) {
    }
    values() {
    }
}
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybUJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2Zvcm1CdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxXQUFXO0lBR3ZCLFlBQ0MsSUFBMEIsRUFDMUIsVUFBcUM7UUFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBZSxFQUFFLEtBQVM7UUFDbkMsd0RBQXdEO0lBQzFELENBQUM7SUFFRCxRQUFRLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUM7SUFFdkMsQ0FBQztJQUVELE1BQU07SUFFTixDQUFDO0NBQ0Y7QUF0QkQsa0NBc0JDIn0=