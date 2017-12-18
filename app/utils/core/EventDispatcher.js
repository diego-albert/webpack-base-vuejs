// TODO use THREE js EventDispatcher instead
export default class EventDispatcher {
  constructor() {
    this.listeners = {};
  }

  dispatchEvent(type, ...parameters) {
    const listeners = this.listeners[type];

    if (!listeners) {
      return;
    }

    for (let i = 0; i < listeners.length; ++i) {
      listeners[i](...parameters);
    }
  }

  addEventListener(type, callback) {
    let listeners = this.listeners[type];

    if (!listeners) {
      listeners = [];
      this.listeners[type] = listeners;
    }

    if (listeners.indexOf(callback) !== -1) {
      return;
    }

    listeners.push(callback);
  }

  removeEventListener(type, callback) {
    const listeners = this.listeners[type];

    if (!listeners) {
      return;
    }

    const i = listeners.indexOf(callback);

    if (i !== -1) {
      listeners.splice(i, 1);
    }
  }

  dispose() {
    this.listeners = {};
  }
}
