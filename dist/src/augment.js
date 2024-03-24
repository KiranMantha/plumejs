import { createToken } from './utils';
const isFunction = (value) => typeof value === 'function';
const updateFnRegistry = Object.create(null);
let token = null;
function signalWrapper(updateFn, fn) {
    const prev = token;
    let generatedToken;
    token = createToken();
    updateFnRegistry[token] = updateFn;
    try {
        fn();
    }
    finally {
        generatedToken = token;
        token = prev;
    }
    return generatedToken;
}
function signal(initialValue) {
    const updateFn = updateFnRegistry[token];
    let value = initialValue;
    function boundSignal() {
        return value;
    }
    boundSignal.set = function (v) {
        if (isFunction(v)) {
            value = v(value);
        }
        else {
            value = v;
        }
        updateFn();
    };
    return boundSignal;
}
function augmentor(updateFn, fn) {
    const generatedToken = signalWrapper(updateFn, fn);
    return function () {
        delete updateFnRegistry[generatedToken];
    };
}
export { augmentor, signal };
