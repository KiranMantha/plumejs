const MutationObserver = require('./mo.mock');

Object.defineProperty(window, 'MutationObserver', { value: MutationObserver.default });

function trigger(eventName, isBubbleing) {
  var event = new Event(eventName, { bubbles: isBubbleing !== undefined ? isBubbleing : false, cancelable: false });
  this.dispatchEvent(event);
}

Element.prototype.trigger = trigger;
