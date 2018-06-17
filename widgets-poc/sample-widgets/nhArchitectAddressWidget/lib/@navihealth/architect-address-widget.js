import { ChangeDetectorRef, Component, ElementRef, NgModule, enableProdMode } from '@angular/core';
import { platformBrowserDynamic as platformBrowserDynamic$1 } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

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
        if (process.env.DEV) {
            console.log('@navihealth/browser-bus ' + action, context);
        }
    }
}
const BusFactory = {
    create: () => {
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
    }
};

class AppComponent {
    /**
     * @param {?} changeDetectorRef
     * @param {?} elementRef
     */
    constructor(changeDetectorRef, elementRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this.title = 'address';
        this.bus = BusFactory.create();
        this.bus.listen({
            eventName: 'architect-selected',
            responder: (event) => {
                this.address = this.getAddress(event.message.name);
                changeDetectorRef.detectChanges();
            }
        });
    }
    /**
     * @param {?} architect
     * @return {?}
     */
    getAddress(architect) {
        switch (architect) {
            case 'Seshan':
                return {
                    line1: '123 Scenic Dr',
                    line2: 'Apt 43',
                    city: 'Nashville',
                    state: 'TN',
                    postalCode: '37203',
                    country: 'US'
                };
            case 'Nijil':
                return {
                    line1: '456 Pearl St',
                    city: 'Nashville',
                    state: 'TN',
                    postalCode: '37203',
                    country: 'US'
                };
            case 'Aneesh':
                return {
                    line1: '789 Main St',
                    city: 'Nashville',
                    state: 'TN',
                    postalCode: '37203',
                    country: 'US'
                };
            default:
                return {
                    line1: 'Corner of 65 and Charlotte',
                    city: 'Nashville',
                    state: 'TN',
                    postalCode: '37203',
                    country: 'US'
                };
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.elementRef.nativeElement.classList.add('architect-address-widget');
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'architect-address-widget',
                template: `
    <div class='col-xs-12'>
      <label>line 1:</label>
      <span *ngIf="address">{{ address.line1 }}</span>
    </div>
    <div class='col-xs-12'>
      <label>line 2:</label>
      <span *ngIf="address">{{ address.line2 }}</span>
    </div>
    <div class='row'>
      <div class='col-8'>
        <label>city:</label>
        <span *ngIf="address">{{ address.city }}</span>
      </div>
      <div class='col-4'>
        <label>state:</label>
        <span *ngIf="address">{{ address.state }}</span>
      </div>
    </div>
    <div class='col-xs-12'>
      <label>postal code:</label>
      <span *ngIf="address">{{ address.postalCode }}</span>
    </div>
    <div class='col-xs-12'>
      <label>country:</label>
      <span *ngIf="address">{{ address.country }}</span>
    </div>
  `,
                styles: [`
    :host.architect-address-widget {
      color: red;
    }
  `]
            },] },
];
/**
 * @nocollapse
 */
AppComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
    { type: ElementRef, },
];

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
 * @nocollapse
 */
AppModule.ctorParameters = () => [];

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
const environment = {
    production: false
};

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (environment.production) {
    enableProdMode();
}
const id = 'c5d03052-1716-4dfb-a08a-76967051d4cf';
const title = 'Architect Address (Angular 4)';
const width = {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 5,
    xl: 4
};
const initialHeight = '250px';
const render = function (container) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const /** @type {?} */ appRoot = document.createElement('architect-address-widget');
                container.appendChild(appRoot);
                yield platformBrowserDynamic$1().bootstrapModule(AppModule);
                resolve();
            }
            catch (error) {
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
 * Generated bundle index. Do not edit.
 */

export default widget;
//# sourceMappingURL=architect-address-widget.js.map
