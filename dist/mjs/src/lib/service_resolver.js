const Injector = new (class {
    map = new Map();
    register(metadata, instance) {
        if (!this.map.get(metadata.name)) {
            this.map.set(metadata.name, instance);
        }
        else {
            throw Error(`${metadata.name} is already registered service.`);
        }
    }
    getService(klass) {
        const metadata = klass.prototype.__metadata__;
        const instance = this.map.get(metadata.name);
        if (instance) {
            return instance;
        }
        else {
            throw Error(`${metadata.name} is not a registered provider.`);
        }
    }
    clear() {
        this.map = new Map();
    }
})();
export { Injector };
