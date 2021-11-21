"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useState = void 0;
const utils_1 = require("../utils");
const useState = (obj) => {
    const initialState = obj;
    const reducer = (fn) => {
        let newState;
        if ((0, utils_1.isFunction)(fn)) {
            newState = fn(initialState);
        }
        else {
            newState = fn;
        }
        Object.assign(initialState, newState);
    };
    return [initialState, reducer];
};
exports.useState = useState;
