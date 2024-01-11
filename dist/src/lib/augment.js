const isFunction = (value) => typeof value === 'function';
const updateFnRegistry = Object.create(null);
let token = null;
function createToken() {
    return Math.random().toString(36).substring(2);
}
function signalWrapper(updateFn, fn) {
    const prev = token;
    let generatedToken;
    token = createToken();
    updateFnRegistry[token] = { updateFn, updates: 0 };
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
    const registery = updateFnRegistry[token];
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
        ++registery.updates;
        if (registery.updates === 1) {
            queueMicrotask(() => {
                registery.updateFn();
                registery.updates = 0;
            });
        }
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
