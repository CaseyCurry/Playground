import { Component, ElementRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { __awaiter } from 'tslib';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AppComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.title = 'architects';
        this.architects = [
            'Seshan',
            'Aneesh',
            'Nijil'
        ];
        this.bus = (/** @type {?} */ (BusFactory)).create();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    newArchitectOnKeyUp(event) {
        this.newArchitectName = event.target.value;
    }
    /**
     * @return {?}
     */
    addOnClick() {
        if (this.newArchitectName) {
            this.architects.push(this.newArchitectName);
            this.bus.notify({
                eventName: 'architect-added',
                message: {
                    name: this.newArchitectName
                }
            });
            this.newArchitectName = "";
        }
    }
    /**
     * @param {?} architect
     * @return {?}
     */
    architectOnClick(architect) {
        this.bus.notify({
            eventName: 'architect-selected',
            message: {
                name: architect
            }
        });
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.elementRef.nativeElement.classList.add('architect-list-widget');
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'architect-list-widget',
                template: `<div class='col-xs-12'>
  <input (keyup)='newArchitectOnKeyUp($event)' placeholder='enter name' />
  <button (click)='addOnClick()' class='btn btn-primary'>Add Architect</button>
  <ul>
    <li *ngFor='let architect of architects' (click)='architectOnClick(architect)'>{{ architect }}</li>
  </ul>
</div>`,
                styles: [`:host.architect-list-widget ul{margin-top:10px;padding:0}:host.architect-list-widget li{list-style:none;color:green}`]
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AppModule {
}
AppModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AppComponent
                ],
                imports: [
                    BrowserModule
                ],
                providers: [],
                bootstrap: [AppComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ id = 'd4181c23-4c1f-4c2a-910a-7d383afb9cd9';
const /** @type {?} */ title = 'Architect List (Angular 5)';
const /** @type {?} */ width = {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 5,
    xl: 4
};
const /** @type {?} */ initialHeight = '250px';
const /** @type {?} */ render = function (container) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const /** @type {?} */ appRoot = document.createElement('architect-list-widget');
                container.appendChild(appRoot);
                yield platformBrowserDynamic().bootstrapModule(AppModule);
                resolve();
            }
            catch (/** @type {?} */ error) {
                reject(error);
            }
        }));
    });
};
var widget = {
    id,
    title,
    width,
    initialHeight,
    render
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export default widget;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWhlYWx0aC1hcmNoaXRlY3QtbGlzdC13aWRnZXQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC9hcHAvYnVzLnRzIiwibmc6Ly9AbmF2aWhlYWx0aC9hcmNoaXRlY3QtbGlzdC13aWRnZXQvYXBwL2FwcC5jb21wb25lbnQudHMiLCJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC9hcHAvYXBwLm1vZHVsZS50cyIsIm5nOi8vQG5hdmloZWFsdGgvYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0L3dpZGdldC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIGNvbnN0IHByb2Nlc3M6IGFueTtcbmRlY2xhcmUgY29uc3Qgd2luZG93OiBhbnk7XG5cbnR5cGUgUmVzcG9uZGVyRnVuY3Rpb24gPSAoZXZlbnQ6IElFdmVudCkgPT4gUHJvbWlzZTxhbnk+O1xuXG5pbnRlcmZhY2UgSUxpc3RlbmVyIHtcbiAgZXZlbnROYW1lOiBzdHJpbmc7XG4gIHJlc3BvbmRlcjogUmVzcG9uZGVyRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBJRXZlbnQge1xuICBldmVudE5hbWU6IHN0cmluZztcbiAgbWVzc2FnZT86IGFueTtcbn1cblxuY2xhc3MgQnVzIHtcbiAgc3Vic2NyaWJlcnM6IG9iamVjdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN1YnNjcmliZXJzID0ge307XG4gIH1cblxuICBwdWJsaWMgbGlzdGVuKGxpc3RlbmVyOiBJTGlzdGVuZXIpIHtcbiAgICB0aGlzLndyaXRlVG9Db25zb2xlSW5EZXYoJ2xpc3RlbicsIGxpc3RlbmVyKTtcbiAgICBpZiAoIWxpc3RlbmVyLmV2ZW50TmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBsaXN0ZW5lci5ldmVudE5hbWUgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghbGlzdGVuZXIucmVzcG9uZGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IGxpc3RlbmVyLnJlc3BvbmQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgcHVibGljIGlnbm9yZShsaXN0ZW5lcjogSUxpc3RlbmVyKSB7XG4gICAgdGhpcy53cml0ZVRvQ29uc29sZUluRGV2KCdpZ25vcmUnLCBsaXN0ZW5lcik7XG4gICAgaWYgKCFsaXN0ZW5lciB8fCAhbGlzdGVuZXIuZXZlbnROYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXTtcbiAgICBpZiAoIWxpc3RlbmVycyB8fCBsaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbm90aWZ5KGV2ZW50OiBJRXZlbnQpIHtcbiAgICB0aGlzLndyaXRlVG9Db25zb2xlSW5EZXYoJ25vdGlmeScsIGV2ZW50KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFldmVudC5ldmVudE5hbWUpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignQXJndW1lbnQgZXZlbnQuZXZlbnROYW1lIGlzIHJlcXVpcmVkLicpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuc3Vic2NyaWJlcnNbZXZlbnQuZXZlbnROYW1lXTtcbiAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgcmVzb2x2ZShQcm9taXNlXG4gICAgICAgICAgLmFsbChsaXN0ZW5lcnMubWFwKGxpc3RlbmVyID0+IGxpc3RlbmVyLnJlc3BvbmRlcihldmVudCkpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHdyaXRlVG9Db25zb2xlSW5EZXYoYWN0aW9uOiBzdHJpbmcsIGNvbnRleHQ6IGFueSkge1xuICAgIC8vIGlmIChwcm9jZXNzLmVudi5ERVYpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdAbmF2aWhlYWx0aC9icm93c2VyLWJ1cyAnICsgYWN0aW9uLCBjb250ZXh0KTtcbiAgICAvLyB9XG4gIH1cbn1cblxuY29uc3QgQnVzRmFjdG9yeSA9IHtcbiAgY3JlYXRlOiAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5uaEJyb3dzZXJCdXMgJiYgd2luZG93Lm5oQnJvd3NlckJ1cy5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5uaEJyb3dzZXJCdXMuaW5zdGFuY2U7XG4gICAgfSBpZiAod2luZG93Lm5oQnJvd3NlckJ1cykge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQnVzKCk7XG4gICAgICB3aW5kb3cubmhCcm93c2VyQnVzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IEJ1cygpO1xuICAgICAgd2luZG93Lm5oQnJvd3NlckJ1cyA9IHsgaW5zdGFuY2U6IGluc3RhbmNlIH07XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBCdXNGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1c0ZhY3RvcnkgfSBmcm9tICcuL2J1cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FyY2hpdGVjdC1saXN0LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz0nY29sLXhzLTEyJz5cbiAgPGlucHV0IChrZXl1cCk9J25ld0FyY2hpdGVjdE9uS2V5VXAoJGV2ZW50KScgcGxhY2Vob2xkZXI9J2VudGVyIG5hbWUnIC8+XG4gIDxidXR0b24gKGNsaWNrKT0nYWRkT25DbGljaygpJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5Jz5BZGQgQXJjaGl0ZWN0PC9idXR0b24+XG4gIDx1bD5cbiAgICA8bGkgKm5nRm9yPSdsZXQgYXJjaGl0ZWN0IG9mIGFyY2hpdGVjdHMnIChjbGljayk9J2FyY2hpdGVjdE9uQ2xpY2soYXJjaGl0ZWN0KSc+e3sgYXJjaGl0ZWN0IH19PC9saT5cbiAgPC91bD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2A6aG9zdC5hcmNoaXRlY3QtbGlzdC13aWRnZXQgdWx7bWFyZ2luLXRvcDoxMHB4O3BhZGRpbmc6MH06aG9zdC5hcmNoaXRlY3QtbGlzdC13aWRnZXQgbGl7bGlzdC1zdHlsZTpub25lO2NvbG9yOmdyZWVufWBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGFyY2hpdGVjdHM6IHN0cmluZ1tdO1xuICBuZXdBcmNoaXRlY3ROYW1lOiBzdHJpbmc7XG4gIGJ1czogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMudGl0bGUgPSAnYXJjaGl0ZWN0cyc7XG4gICAgdGhpcy5hcmNoaXRlY3RzID0gW1xuICAgICAgJ1Nlc2hhbicsXG4gICAgICAnQW5lZXNoJyxcbiAgICAgICdOaWppbCdcbiAgICBdO1xuICAgIHRoaXMuYnVzID0gKEJ1c0ZhY3RvcnkgYXMgYW55KS5jcmVhdGUoKTtcbiAgfVxuXG4gIG5ld0FyY2hpdGVjdE9uS2V5VXAoZXZlbnQpIHtcbiAgICB0aGlzLm5ld0FyY2hpdGVjdE5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBhZGRPbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLm5ld0FyY2hpdGVjdE5hbWUpIHtcbiAgICAgIHRoaXMuYXJjaGl0ZWN0cy5wdXNoKHRoaXMubmV3QXJjaGl0ZWN0TmFtZSk7XG4gICAgICB0aGlzLmJ1cy5ub3RpZnkoe1xuICAgICAgICBldmVudE5hbWU6ICdhcmNoaXRlY3QtYWRkZWQnLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgbmFtZTogdGhpcy5uZXdBcmNoaXRlY3ROYW1lXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5uZXdBcmNoaXRlY3ROYW1lID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBhcmNoaXRlY3RPbkNsaWNrKGFyY2hpdGVjdCkge1xuICAgIHRoaXMuYnVzLm5vdGlmeSh7XG4gICAgICBldmVudE5hbWU6ICdhcmNoaXRlY3Qtc2VsZWN0ZWQnLFxuICAgICAgbWVzc2FnZToge1xuICAgICAgICBuYW1lOiBhcmNoaXRlY3RcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhcmNoaXRlY3QtbGlzdC13aWRnZXQnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBib290c3RyYXA6IFtBcHBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiIsImltcG9ydCB7IGVuYWJsZVByb2RNb2RlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG5pZiAoZW52aXJvbm1lbnQucHJvZHVjdGlvbikge1xuICBlbmFibGVQcm9kTW9kZSgpO1xufVxuXG5jb25zdCBpZCA9ICdkNDE4MWMyMy00YzFmLTRjMmEtOTEwYS03ZDM4M2FmYjljZDknO1xuY29uc3QgdGl0bGUgPSAnQXJjaGl0ZWN0IExpc3QgKEFuZ3VsYXIgNSknO1xuY29uc3Qgd2lkdGggPSB7XG4gIHhzOiAxMixcbiAgc206IDgsXG4gIG1kOiA2LFxuICBsZzogNSxcbiAgeGw6IDRcbn07XG5jb25zdCBpbml0aWFsSGVpZ2h0ID0gJzI1MHB4JztcbmNvbnN0IHJlbmRlciA9IGFzeW5jIGZ1bmN0aW9uKGNvbnRhaW5lcjogRWxlbWVudCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhcHBSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0Jyk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwUm9vdCk7XG4gICAgICBhd2FpdCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaWQsXG4gIHRpdGxlLFxuICB3aWR0aCxcbiAgaW5pdGlhbEhlaWdodCxcbiAgcmVuZGVyXG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBZUE7SUFHRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQUVNLE1BQU0sQ0FBQyxRQUFtQjtRQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztJQUcvQyxNQUFNLENBQUMsUUFBbUI7UUFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxPQUFPO1NBQ1I7UUFDRCx1QkFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENB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