const Injector = new (class {
    #weakMap = new WeakMap();
    register(serviceName, instance) {
        if (!this.#weakMap.get({ key: serviceName })) {
            this.#weakMap.set({ key: serviceName }, instance);
        }
        else {
            throw Error(`${serviceName} is not a registered service.`);
        }
    }
    getService(serviceName) {
        const instance = this.#weakMap.get({ key: serviceName });
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${serviceName} is not a registered provider.`);
        }
    }
    clear() {
        this.#weakMap = new WeakMap();
    }
})();
export { Injector };
