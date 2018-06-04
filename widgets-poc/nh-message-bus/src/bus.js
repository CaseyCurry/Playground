class Bus {
  constructor() {
    this.subscribers = {};
  }

  listen(listener) {
    if (!listener.eventName) {
      throw new Error("Argument listener.eventName is required.");
    }
    if (!listener.respond) {
      throw new Error("Argument listener.respond is required.");
    }
    if (!this.subscribers[listener.eventName]) {
      this.subscribers[listener.eventName] = [];
    }
    this.subscribers[listener.eventName].push(listener);
  }

  ignore(listener) {
    if (!listener || !listener.eventName) {
      return;
    }
    const listeners = this.subscribers[listener.eventName];
    if (!listeners || listeners.length === 0) {
      return;
    }
    const index = listeners.indexOf(listener);
    if (index > -1) {
      this.subscribers[listener.eventName].splice(index, 1);
    }
  }

  notify(event) {
    return new Promise((resolve, reject) => {
      if (!event.eventName) {
        reject(new Error("Argument event.eventName is required."));
      }
      const listeners = this.subscribers[event.eventName];
      if (listeners) {
        resolve(Promise
          .all(listeners.map(listener => listener.respond(event))));
      }
    });
  }
}

const instance = typeof window != "undefined" && window.nhBrowserBus ? window.nhBrowserBus : new Bus();

export default instance;