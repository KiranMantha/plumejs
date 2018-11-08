const MutationObserver = require('./mo.mock');

Object.defineProperty(window, 'MutationObserver', { value: MutationObserver.default });
