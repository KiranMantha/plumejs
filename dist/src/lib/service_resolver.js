const Injector = new class {
    constructor() {
        this._map = new Map();
    }
    register(serviceName, instance) {
        if (!this._map.get(serviceName)) {
            this._map.set(serviceName, instance);
        }
        else {
            throw Error(`${serviceName} is not a registered service.`);
        }
    }
    getService(serviceName) {
        let instance = this._map.get(serviceName);
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${serviceName} is not a registered provider.`);
        }
    }
    clear() {
        this._map = new Map();
    }
};
export { Injector };
