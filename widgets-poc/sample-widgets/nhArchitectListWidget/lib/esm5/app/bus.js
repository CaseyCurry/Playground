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
var Bus = /** @class */ (function () {
    function Bus() {
        this.subscribers = {};
    }
    /**
     * @param {?} listener
     * @return {?}
     */
    Bus.prototype.listen = /**
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
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
    };
    /**
     * @param {?} listener
     * @return {?}
     */
    Bus.prototype.ignore = /**
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this.writeToConsoleInDev('ignore', listener);
        if (!listener || !listener.eventName) {
            return;
        }
        var /** @type {?} */ listeners = this.subscribers[listener.eventName];
        if (!listeners || listeners.length === 0) {
            return;
        }
        var /** @type {?} */ index = listeners.indexOf(listener);
        if (index > -1) {
            this.subscribers[listener.eventName].splice(index, 1);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Bus.prototype.notify = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this.writeToConsoleInDev('notify', event);
        return new Promise(function (resolve, reject) {
            if (!event.eventName) {
                reject(new Error('Argument event.eventName is required.'));
            }
            var /** @type {?} */ listeners = _this.subscribers[event.eventName];
            if (listeners) {
                resolve(Promise
                    .all(listeners.map(function (listener) { return listener.responder(event); })));
            }
        });
    };
    /**
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    Bus.prototype.writeToConsoleInDev = /**
     * @param {?} action
     * @param {?} context
     * @return {?}
     */
    function (action, context) {
        // if (process.env.DEV) {
        console.log('@navihealth/browser-bus ' + action, context);
        // }
    };
    return Bus;
}());
function Bus_tsickle_Closure_declarations() {
    /** @type {?} */
    Bus.prototype.subscribers;
}
var ɵ0 = function () {
    if (window.nhBrowserBus && window.nhBrowserBus.instance) {
        return window.nhBrowserBus.instance;
    }
    if (window.nhBrowserBus) {
        var /** @type {?} */ instance = new Bus();
        window.nhBrowserBus.instance = instance;
        return instance;
    }
    else {
        var /** @type {?} */ instance = new Bus();
        window.nhBrowserBus = { instance: instance };
        return instance;
    }
};
var /** @type {?} */ BusFactory = {
    create: ɵ0
};
export { BusFactory };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5hdmloZWFsdGgvYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0LyIsInNvdXJjZXMiOlsiYXBwL2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFBO0lBR0U7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFFTSxvQkFBTTs7OztjQUFDLFFBQW1CO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7U0FDN0Q7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUMzRDtRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBRy9DLG9CQUFNOzs7O2NBQUMsUUFBbUI7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQztTQUNSO1FBQ0QscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUM7U0FDUjtRQUNELHFCQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEOzs7Ozs7SUFHSSxvQkFBTTs7OztjQUFDLEtBQWE7O1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQzthQUM1RDtZQUNELHFCQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxPQUFPO3FCQUNaLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRDtTQUNGLENBQUMsQ0FBQzs7Ozs7OztJQUdHLGlDQUFtQjs7Ozs7Y0FBQyxNQUFjLEVBQUUsT0FBWTs7UUFFcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7OztjQW5FaEU7SUFzRUMsQ0FBQTs7Ozs7U0FHUztJQUNOLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztLQUNyQztJQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzFCLHFCQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN4QyxNQUFNLENBQUMsUUFBUSxDQUFDO0tBQ2pCO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixxQkFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDakI7Q0FDRjtBQWJILHFCQUFNLFVBQVUsR0FBRztJQUNqQixNQUFNLElBWUw7Q0FDRixDQUFDO0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBjb25zdCBwcm9jZXNzOiBhbnk7XG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogYW55O1xuXG50eXBlIFJlc3BvbmRlckZ1bmN0aW9uID0gKGV2ZW50OiBJRXZlbnQpID0+IFByb21pc2U8YW55PjtcblxuaW50ZXJmYWNlIElMaXN0ZW5lciB7XG4gIGV2ZW50TmFtZTogc3RyaW5nO1xuICByZXNwb25kZXI6IFJlc3BvbmRlckZ1bmN0aW9uO1xufVxuXG5pbnRlcmZhY2UgSUV2ZW50IHtcbiAgZXZlbnROYW1lOiBzdHJpbmc7XG4gIG1lc3NhZ2U/OiBhbnk7XG59XG5cbmNsYXNzIEJ1cyB7XG4gIHN1YnNjcmliZXJzOiBvYmplY3Q7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJzY3JpYmVycyA9IHt9O1xuICB9XG5cbiAgcHVibGljIGxpc3RlbihsaXN0ZW5lcjogSUxpc3RlbmVyKSB7XG4gICAgdGhpcy53cml0ZVRvQ29uc29sZUluRGV2KCdsaXN0ZW4nLCBsaXN0ZW5lcik7XG4gICAgaWYgKCFsaXN0ZW5lci5ldmVudE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbGlzdGVuZXIuZXZlbnROYW1lIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoIWxpc3RlbmVyLnJlc3BvbmRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBsaXN0ZW5lci5yZXNwb25kIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXS5wdXNoKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBpZ25vcmUobGlzdGVuZXI6IElMaXN0ZW5lcikge1xuICAgIHRoaXMud3JpdGVUb0NvbnNvbGVJbkRldignaWdub3JlJywgbGlzdGVuZXIpO1xuICAgIGlmICghbGlzdGVuZXIgfHwgIWxpc3RlbmVyLmV2ZW50TmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV07XG4gICAgaWYgKCFsaXN0ZW5lcnMgfHwgbGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5vdGlmeShldmVudDogSUV2ZW50KSB7XG4gICAgdGhpcy53cml0ZVRvQ29uc29sZUluRGV2KCdub3RpZnknLCBldmVudCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghZXZlbnQuZXZlbnROYW1lKSB7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0FyZ3VtZW50IGV2ZW50LmV2ZW50TmFtZSBpcyByZXF1aXJlZC4nKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmliZXJzW2V2ZW50LmV2ZW50TmFtZV07XG4gICAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgIHJlc29sdmUoUHJvbWlzZVxuICAgICAgICAgIC5hbGwobGlzdGVuZXJzLm1hcChsaXN0ZW5lciA9PiBsaXN0ZW5lci5yZXNwb25kZXIoZXZlbnQpKSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB3cml0ZVRvQ29uc29sZUluRGV2KGFjdGlvbjogc3RyaW5nLCBjb250ZXh0OiBhbnkpIHtcbiAgICAvLyBpZiAocHJvY2Vzcy5lbnYuREVWKSB7XG4gICAgICBjb25zb2xlLmxvZygnQG5hdmloZWFsdGgvYnJvd3Nlci1idXMgJyArIGFjdGlvbiwgY29udGV4dCk7XG4gICAgLy8gfVxuICB9XG59XG5cbmNvbnN0IEJ1c0ZhY3RvcnkgPSB7XG4gIGNyZWF0ZTogKCkgPT4ge1xuICAgIGlmICh3aW5kb3cubmhCcm93c2VyQnVzICYmIHdpbmRvdy5uaEJyb3dzZXJCdXMuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiB3aW5kb3cubmhCcm93c2VyQnVzLmluc3RhbmNlO1xuICAgIH0gaWYgKHdpbmRvdy5uaEJyb3dzZXJCdXMpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IEJ1cygpO1xuICAgICAgd2luZG93Lm5oQnJvd3NlckJ1cy5pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBCdXMoKTtcbiAgICAgIHdpbmRvdy5uaEJyb3dzZXJCdXMgPSB7IGluc3RhbmNlOiBpbnN0YW5jZSB9O1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgQnVzRmFjdG9yeSB9O1xuIl19