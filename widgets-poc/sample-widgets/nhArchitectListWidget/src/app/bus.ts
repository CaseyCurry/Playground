declare const process: any;
declare const window: any;

type ResponderFunction = (event: IEvent) => Promise<any>;

interface IListener {
  eventName: string;
  responder: ResponderFunction;
}

interface IEvent {
  eventName: string;
  message?: any;
}

class Bus {
  subscribers: object;

  constructor() {
    this.subscribers = {};
  }

  public listen(listener: IListener) {
    this.writeToConsoleInDev('listen', listener);
    if (!listener.eventName) {
      throw new Error('Argument listener.eventName is required.');
    }
    if (!listener.responder) {
      throw new Error('Argument listener.respond is required.');
    }
    if (!this.subscribers[listener.eventName]) {
      this.subscribers[listener.eventName] = [];
    }
    this.subscribers[listener.eventName].push(listener);
  }

  public ignore(listener: IListener) {
    this.writeToConsoleInDev('ignore', listener);
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

  public notify(event: IEvent) {
    this.writeToConsoleInDev('notify', event);
    return new Promise((resolve, reject) => {
      if (!event.eventName) {
        reject(new Error('Argument event.eventName is required.'));
      }
      const listeners = this.subscribers[event.eventName];
      if (listeners) {
        resolve(Promise
          .all(listeners.map(listener => listener.responder(event))));
      }
    });
  }

  private writeToConsoleInDev(action: string, context: any) {
    // if (process.env.DEV) {
      console.log('@navihealth/browser-bus ' + action, context);
    // }
  }
}

const BusFactory = {
  create: () => {
    if (window.nhBrowserBus && window.nhBrowserBus.instance) {
      return window.nhBrowserBus.instance;
    } if (window.nhBrowserBus) {
      const instance = new Bus();
      window.nhBrowserBus.instance = instance;
      return instance;
    } else {
      const instance = new Bus();
      window.nhBrowserBus = { instance: instance };
      return instance;
    }
  }
};

export { BusFactory };
