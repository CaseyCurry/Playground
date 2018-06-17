(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@angular/core'), require('@angular/platform-browser-dynamic'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['@angular/core', '@angular/platform-browser-dynamic', '@angular/platform-browser'], factory) :
	(global['architect-address-widget'] = factory(global.ng.core,global.ng.platformBrowserDynamic,global.ng.platformBrowser));
}(this, (function (core,platformBrowserDynamic,platformBrowser) { 'use strict';

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Bus = (function () {
    function Bus() {
        this.subscribers = {};
    }
    /**
     * @param {?} listener
     * @return {?}
     */
    Bus.prototype.listen = function (listener) {
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
    Bus.prototype.ignore = function (listener) {
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
    Bus.prototype.notify = function (event) {
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
    Bus.prototype.writeToConsoleInDev = function (action, context) {
        if (process.env.DEV) {
            console.log('@navihealth/browser-bus ' + action, context);
        }
    };
    return Bus;
}());
var BusFactory = {
    create: function () {
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
    }
};
var AppComponent = (function () {
    /**
     * @param {?} changeDetectorRef
     * @param {?} elementRef
     */
    function AppComponent(changeDetectorRef, elementRef) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this.title = 'address';
        this.bus = BusFactory.create();
        this.bus.listen({
            eventName: 'architect-selected',
            responder: function (event) {
                _this.address = _this.getAddress(event.message.name);
                changeDetectorRef.detectChanges();
            }
        });
    }
    /**
     * @param {?} architect
     * @return {?}
     */
    AppComponent.prototype.getAddress = function (architect) {
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
    };
    /**
     * @return {?}
     */
    AppComponent.prototype.ngAfterContentInit = function () {
        this.elementRef.nativeElement.classList.add('architect-address-widget');
    };
    return AppComponent;
}());
AppComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'architect-address-widget',
                template: "\n    <div class='col-xs-12'>\n      <label>line 1:</label>\n      <span *ngIf=\"address\">{{ address.line1 }}</span>\n    </div>\n    <div class='col-xs-12'>\n      <label>line 2:</label>\n      <span *ngIf=\"address\">{{ address.line2 }}</span>\n    </div>\n    <div class='row'>\n      <div class='col-8'>\n        <label>city:</label>\n        <span *ngIf=\"address\">{{ address.city }}</span>\n      </div>\n      <div class='col-4'>\n        <label>state:</label>\n        <span *ngIf=\"address\">{{ address.state }}</span>\n      </div>\n    </div>\n    <div class='col-xs-12'>\n      <label>postal code:</label>\n      <span *ngIf=\"address\">{{ address.postalCode }}</span>\n    </div>\n    <div class='col-xs-12'>\n      <label>country:</label>\n      <span *ngIf=\"address\">{{ address.country }}</span>\n    </div>\n  ",
                styles: ["\n    :host.architect-address-widget {\n      color: red;\n    }\n  "]
            },] },
];
/**
 * @nocollapse
 */
AppComponent.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
    { type: core.ElementRef, },
]; };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    AppComponent
                ],
                imports: [
                    platformBrowser.BrowserModule
                ],
                providers: [],
                bootstrap: [AppComponent]
            },] },
];
/**
 * @nocollapse
 */
AppModule.ctorParameters = function () { return []; };
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (environment.production) {
    core.enableProdMode();
}
var id = 'c5d03052-1716-4dfb-a08a-76967051d4cf';
var title = 'Architect Address (Angular 4)';
var width = {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 5,
    xl: 4
};
var initialHeight = '250px';
var render = function (container) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var appRoot, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                appRoot = document.createElement('architect-address-widget');
                                container.appendChild(appRoot);
                                return [4 /*yield*/, platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppModule)];
                            case 1:
                                _a.sent();
                                resolve();
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                reject(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
};
var widget = {
    id: id,
    title: title,
    width: width,
    initialHeight: initialHeight,
    render: render
};

return widget;

})));
//# sourceMappingURL=architect-address-widget.umd.js.map
