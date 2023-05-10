class Renderer {
    _hostElement;
    _shadowRoot;
    get __metadata__() {
        return { name: 'RENDERER' };
    }
    get hostElement() {
        return this._hostElement;
    }
    get shadowRoot() {
        return this._shadowRoot;
    }
    update;
    emitEvent;
    constructor(_hostElement, _shadowRoot) {
        this._hostElement = _hostElement;
        this._shadowRoot = _shadowRoot;
    }
}
export { Renderer };
