/* Polyfill indexOf. */
let indexOf;
if (typeof Array.prototype.indexOf === 'function') {
  indexOf = (haystack, needle) => {
    return haystack.indexOf(needle);
  };
} else {
  indexOf = (haystack, needle) => {
    let i = 0, length = haystack.length, idx = -1, found = false;
    while (i < length && !found) {
      if (haystack[i] === needle) {
        idx = i;
        found = true;
      }
      i++;
    }
    return idx;
  };
};


/* Polyfill EventEmitter. */
class EventEmitter {
  event;
  constructor() { }
  addListener(listener) {
    this.event = listener;
  }
  removeListener(listener) {
    this.event = undefined;
  }
  emit(args) {
    if (this.event) {
      this.event(args);
    }
  }
}

export { EventEmitter };