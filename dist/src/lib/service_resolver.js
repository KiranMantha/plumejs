const Injector = new (class {
    _map = new Map();
    register(serviceName, instance) {
        if (!this._map.get(serviceName)) {
            this._map.set(serviceName, instance);
        }
        else {
            throw Error(`${serviceName} is not a registered service.`);
        }
    }
    getService(serviceName) {
        const instance = this._map.get(serviceName);
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
})();
export { Injector };
