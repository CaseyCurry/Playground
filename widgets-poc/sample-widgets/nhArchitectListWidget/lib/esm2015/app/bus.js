/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
function IListener() { }
function IListener_tsickle_Closure_declarations() {
    /** @type {?} */
    IListener.prototype.eventName;
    /** @type {?} */
    IListener.prototype.responder;
}
/**
 * @record
 */
function IEvent() { }
function IEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    IEvent.prototype.eventName;
    /** @type {?|undefined} */
    IEvent.prototype.message;
}
class Bus {
    constructor() {
        this.subscribers = {};
    }
    /**
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
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
    /**
     * @param {?} listener
     * @return {?}
     */
    ignore(listener) {
        this.writeToConsoleInDev('ignore', listener);
        if (!listener || !listener.eventName) {
            return;
        }
        const /** @type {?} */ listeners = this.subscribers[listener.eventName];
        if (!listeners || listeners.length === 0) {
            return;
        }
        const /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            this.subscribers[listener.eventName].splice(index, 1);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    notify(event) {
        this.writeToConsoleInDev('notify', event);
        return new Promise((resolve, reject) => {
            if (!event.eventName) {
                reject(new Error('Argument event.eventName is required.'));
            }
            const /** @type {?} */ listeners = this.subscribers[event.eventName];
            if (listeners) {
                resolve(Promise
                    .all(listeners.map(listener => listener.responder(event))));
            }
        });
    }
    /**
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    writeToConsoleInDev(action, context) {
        // if (process.env.DEV) {
        console.log('@navihealth/browser-bus ' + action, context);
        // }
    }
}
function Bus_tsickle_Closure_declarations() {
    /** @type {?} */
    Bus.prototype.subscribers;
}
const ɵ0 = () => {
    if (window.nhBrowserBus && window.nhBrowserBus.instance) {
        return window.nhBrowserBus.instance;
    }
    if (window.nhBrowserBus) {
        const /** @type {?} */ instance = new Bus();
        window.nhBrowserBus.instance = instance;
        return instance;
    }
    else {
        const /** @type {?} */ instance = new Bus();
        window.nhBrowserBus = { instance: instance };
        return instance;
    }
};
const /** @type {?} */ BusFactory = {
    create: ɵ0
};
export { BusFactory };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5hdmloZWFsdGgvYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0LyIsInNvdXJjZXMiOlsiYXBwL2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTtJQUdFO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7S0FDdkI7Ozs7O0lBRU0sTUFBTSxDQUFDLFFBQW1CO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUMzRDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBRy9DLE1BQU0sQ0FBQyxRQUFtQjtRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDO1NBQ1I7UUFDRCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQztTQUNSO1FBQ0QsdUJBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7Ozs7OztJQUdJLE1BQU0sQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsT0FBTztxQkFDWixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7U0FDRixDQUFDLENBQUM7Ozs7Ozs7SUFHRyxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsT0FBWTs7UUFFcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7OztDQUcvRDs7Ozs7V0FHUyxHQUFHLEVBQUU7SUFDWCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7S0FDckM7SUFBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUMxQix1QkFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDeEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUNqQjtJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sdUJBQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLFlBQVksR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCO0NBQ0Y7QUFiSCx1QkFBTSxVQUFVLEdBQUc7SUFDakIsTUFBTSxJQVlMO0NBQ0YsQ0FBQztBQUVGLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgY29uc3QgcHJvY2VzczogYW55O1xuZGVjbGFyZSBjb25zdCB3aW5kb3c6IGFueTtcblxudHlwZSBSZXNwb25kZXJGdW5jdGlvbiA9IChldmVudDogSUV2ZW50KSA9PiBQcm9taXNlPGFueT47XG5cbmludGVyZmFjZSBJTGlzdGVuZXIge1xuICBldmVudE5hbWU6IHN0cmluZztcbiAgcmVzcG9uZGVyOiBSZXNwb25kZXJGdW5jdGlvbjtcbn1cblxuaW50ZXJmYWNlIElFdmVudCB7XG4gIGV2ZW50TmFtZTogc3RyaW5nO1xuICBtZXNzYWdlPzogYW55O1xufVxuXG5jbGFzcyBCdXMge1xuICBzdWJzY3JpYmVyczogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3Vic2NyaWJlcnMgPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBsaXN0ZW4obGlzdGVuZXI6IElMaXN0ZW5lcikge1xuICAgIHRoaXMud3JpdGVUb0NvbnNvbGVJbkRldignbGlzdGVuJywgbGlzdGVuZXIpO1xuICAgIGlmICghbGlzdGVuZXIuZXZlbnROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IGxpc3RlbmVyLmV2ZW50TmFtZSBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCFsaXN0ZW5lci5yZXNwb25kZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbGlzdGVuZXIucmVzcG9uZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICBwdWJsaWMgaWdub3JlKGxpc3RlbmVyOiBJTGlzdGVuZXIpIHtcbiAgICB0aGlzLndyaXRlVG9Db25zb2xlSW5EZXYoJ2lnbm9yZScsIGxpc3RlbmVyKTtcbiAgICBpZiAoIWxpc3RlbmVyIHx8ICFsaXN0ZW5lci5ldmVudE5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdO1xuICAgIGlmICghbGlzdGVuZXJzIHx8IGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBub3RpZnkoZXZlbnQ6IElFdmVudCkge1xuICAgIHRoaXMud3JpdGVUb0NvbnNvbGVJbkRldignbm90aWZ5JywgZXZlbnQpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LmV2ZW50TmFtZSkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdBcmd1bWVudCBldmVudC5ldmVudE5hbWUgaXMgcmVxdWlyZWQuJykpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpYmVyc1tldmVudC5ldmVudE5hbWVdO1xuICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICByZXNvbHZlKFByb21pc2VcbiAgICAgICAgICAuYWxsKGxpc3RlbmVycy5tYXAobGlzdGVuZXIgPT4gbGlzdGVuZXIucmVzcG9uZGVyKGV2ZW50KSkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd3JpdGVUb0NvbnNvbGVJbkRldihhY3Rpb246IHN0cmluZywgY29udGV4dDogYW55KSB7XG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFVikge1xuICAgICAgY29uc29sZS5sb2coJ0BuYXZpaGVhbHRoL2Jyb3dzZXItYnVzICcgKyBhY3Rpb24sIGNvbnRleHQpO1xuICAgIC8vIH1cbiAgfVxufVxuXG5jb25zdCBCdXNGYWN0b3J5ID0ge1xuICBjcmVhdGU6ICgpID0+IHtcbiAgICBpZiAod2luZG93Lm5oQnJvd3NlckJ1cyAmJiB3aW5kb3cubmhCcm93c2VyQnVzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm5oQnJvd3NlckJ1cy5pbnN0YW5jZTtcbiAgICB9IGlmICh3aW5kb3cubmhCcm93c2VyQnVzKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBCdXMoKTtcbiAgICAgIHdpbmRvdy5uaEJyb3dzZXJCdXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQnVzKCk7XG4gICAgICB3aW5kb3cubmhCcm93c2VyQnVzID0geyBpbnN0YW5jZTogaW5zdGFuY2UgfTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IEJ1c0ZhY3RvcnkgfTtcbiJdfQ==