import { isFunction } from '../utils';
const useState = (obj) => {
    const initialState = obj;
    const reducer = (fn) => {
        let newState;
        if (isFunction(fn)) {
            newState = fn(initialState);
        }
        else {
            newState = fn;
        }
        Object.assign(initialState, newState);
    };
    return [initialState, reducer];
};
export { useState };
