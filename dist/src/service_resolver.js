const Injector = new (class {
    map = new WeakMap();
    register(klass, instance) {
        if (!this.map.get(klass)) {
            this.map.set(klass, instance);
        }
        else {
            throw Error(`${klass} is already registered service.`);
        }
    }
    getService(klass) {
        const instance = this.map.get(klass);
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${klass} is not a registered provider.`);
        }
    }
    removeService(klass) {
        this.map.delete(klass);
    }
    clear() {
        this.map = new WeakMap();
    }
})();
export { Injector };
