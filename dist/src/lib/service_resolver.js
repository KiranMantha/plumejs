const Injector = new (class {
    #map = new Map();
    register(serviceName, instance) {
        if (!this.#map.get(serviceName)) {
            this.#map.set(serviceName, instance);
        }
        else {
            throw Error(`${serviceName} is already registered service.`);
        }
    }
    getService(serviceName) {
        const instance = this.#map.get(serviceName);
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${serviceName} is not a registered provider.`);
        }
    }
    clear() {
        this.#map = new Map();
    }
})();
export { Injector };
