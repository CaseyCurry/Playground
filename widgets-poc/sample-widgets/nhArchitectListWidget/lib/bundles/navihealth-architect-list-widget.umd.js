(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@angular/core'), require('@angular/platform-browser'), require('@angular/platform-browser-dynamic')) :
    typeof define === 'function' && define.amd ? define('@navihealth/architect-list-widget', ['@angular/core', '@angular/platform-browser', '@angular/platform-browser-dynamic'], factory) :
    (global.navihealth = global.navihealth || {}, global.navihealth['architect-list-widget'] = factory(global.ng.core,global.ng.platformBrowser,global.ng.platformBrowserDynamic));
}(this, (function (core,platformBrowser,platformBrowserDynamic) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
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
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Bus = (function () {
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AppComponent = (function () {
        function AppComponent() {
            this.title = 'architects';
            this.architects = [
                'Seshan',
                'Aneesh',
                'Nijil'
            ];
            this.bus = ((BusFactory)).create();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        AppComponent.prototype.newArchitectOnKeyUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.newArchitectName = event.target.value;
            };
        /**
         * @return {?}
         */
        AppComponent.prototype.addOnClick = /**
         * @return {?}
         */
            function () {
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
            };
        /**
         * @param {?} architect
         * @return {?}
         */
        AppComponent.prototype.architectOnClick = /**
         * @param {?} architect
         * @return {?}
         */
            function (architect) {
                this.bus.notify({
                    eventName: 'architect-selected',
                    message: {
                        name: architect
                    }
                });
            };
        AppComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'architect-list-widget',
                        template: "<div class='col-xs-12'>\n  <input (keyup)='newArchitectOnKeyUp($event)' placeholder='enter name' />\n  <button (click)='addOnClick()' class='btn btn-primary'>Add Architect</button>\n  <ul>\n    <li *ngFor='let architect of architects' (click)='architectOnClick(architect)'>{{ architect }}</li>\n  </ul>\n</div>",
                        styles: ["ul{margin-top:10px;padding:0}li{list-style:none}"]
                    },] },
        ];
        /** @nocollapse */
        AppComponent.ctorParameters = function () { return []; };
        return AppComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AppModule = (function () {
        function AppModule() {
        }
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
        return AppModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ id = 'd4181c23-4c1f-4c2a-910a-7d383afb9cd9';
    var /** @type {?} */ title = 'Architect List (Angular 5)';
    var /** @type {?} */ width = {
        xs: 12,
        sm: 8,
        md: 6,
        lg: 5,
        xl: 4
    };
    var /** @type {?} */ initialHeight = '250px';
    var /** @type {?} */ render = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var appRoot, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        appRoot = document.createElement('architect-list-widget');
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
                        });
                    })];
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    return widget;

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWhlYWx0aC1hcmNoaXRlY3QtbGlzdC13aWRnZXQudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC9hcHAvYnVzLnRzIiwibmc6Ly9AbmF2aWhlYWx0aC9hcmNoaXRlY3QtbGlzdC13aWRnZXQvYXBwL2FwcC5jb21wb25lbnQudHMiLCJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC9hcHAvYXBwLm1vZHVsZS50cyIsIm5nOi8vQG5hdmloZWFsdGgvYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0L3dpZGdldC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImRlY2xhcmUgY29uc3QgcHJvY2VzczogYW55O1xuZGVjbGFyZSBjb25zdCB3aW5kb3c6IGFueTtcblxudHlwZSBSZXNwb25kZXJGdW5jdGlvbiA9IChldmVudDogSUV2ZW50KSA9PiBQcm9taXNlPGFueT47XG5cbmludGVyZmFjZSBJTGlzdGVuZXIge1xuICBldmVudE5hbWU6IHN0cmluZztcbiAgcmVzcG9uZGVyOiBSZXNwb25kZXJGdW5jdGlvbjtcbn1cblxuaW50ZXJmYWNlIElFdmVudCB7XG4gIGV2ZW50TmFtZTogc3RyaW5nO1xuICBtZXNzYWdlPzogYW55O1xufVxuXG5jbGFzcyBCdXMge1xuICBzdWJzY3JpYmVyczogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3Vic2NyaWJlcnMgPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBsaXN0ZW4obGlzdGVuZXI6IElMaXN0ZW5lcikge1xuICAgIHRoaXMud3JpdGVUb0NvbnNvbGVJbkRldignbGlzdGVuJywgbGlzdGVuZXIpO1xuICAgIGlmICghbGlzdGVuZXIuZXZlbnROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IGxpc3RlbmVyLmV2ZW50TmFtZSBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCFsaXN0ZW5lci5yZXNwb25kZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbGlzdGVuZXIucmVzcG9uZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0pIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmliZXJzW2xpc3RlbmVyLmV2ZW50TmFtZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICBwdWJsaWMgaWdub3JlKGxpc3RlbmVyOiBJTGlzdGVuZXIpIHtcbiAgICB0aGlzLndyaXRlVG9Db25zb2xlSW5EZXYoJ2lnbm9yZScsIGxpc3RlbmVyKTtcbiAgICBpZiAoIWxpc3RlbmVyIHx8ICFsaXN0ZW5lci5ldmVudE5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpYmVyc1tsaXN0ZW5lci5ldmVudE5hbWVdO1xuICAgIGlmICghbGlzdGVuZXJzIHx8IGxpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlcnNbbGlzdGVuZXIuZXZlbnROYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBub3RpZnkoZXZlbnQ6IElFdmVudCkge1xuICAgIHRoaXMud3JpdGVUb0NvbnNvbGVJbkRldignbm90aWZ5JywgZXZlbnQpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LmV2ZW50TmFtZSkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdBcmd1bWVudCBldmVudC5ldmVudE5hbWUgaXMgcmVxdWlyZWQuJykpO1xuICAgICAgfVxuICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpYmVyc1tldmVudC5ldmVudE5hbWVdO1xuICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICByZXNvbHZlKFByb21pc2VcbiAgICAgICAgICAuYWxsKGxpc3RlbmVycy5tYXAobGlzdGVuZXIgPT4gbGlzdGVuZXIucmVzcG9uZGVyKGV2ZW50KSkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgd3JpdGVUb0NvbnNvbGVJbkRldihhY3Rpb246IHN0cmluZywgY29udGV4dDogYW55KSB7XG4gICAgLy8gaWYgKHByb2Nlc3MuZW52LkRFVikge1xuICAgICAgY29uc29sZS5sb2coJ0BuYXZpaGVhbHRoL2Jyb3dzZXItYnVzICcgKyBhY3Rpb24sIGNvbnRleHQpO1xuICAgIC8vIH1cbiAgfVxufVxuXG5jb25zdCBCdXNGYWN0b3J5ID0ge1xuICBjcmVhdGU6ICgpID0+IHtcbiAgICBpZiAod2luZG93Lm5oQnJvd3NlckJ1cyAmJiB3aW5kb3cubmhCcm93c2VyQnVzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gd2luZG93Lm5oQnJvd3NlckJ1cy5pbnN0YW5jZTtcbiAgICB9IGlmICh3aW5kb3cubmhCcm93c2VyQnVzKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBCdXMoKTtcbiAgICAgIHdpbmRvdy5uaEJyb3dzZXJCdXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQnVzKCk7XG4gICAgICB3aW5kb3cubmhCcm93c2VyQnVzID0geyBpbnN0YW5jZTogaW5zdGFuY2UgfTtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IEJ1c0ZhY3RvcnkgfTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnVzRmFjdG9yeSB9IGZyb20gJy4vYnVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPSdjb2wteHMtMTInPlxuICA8aW5wdXQgKGtleXVwKT0nbmV3QXJjaGl0ZWN0T25LZXlVcCgkZXZlbnQpJyBwbGFjZWhvbGRlcj0nZW50ZXIgbmFtZScgLz5cbiAgPGJ1dHRvbiAoY2xpY2spPSdhZGRPbkNsaWNrKCknIGNsYXNzPSdidG4gYnRuLXByaW1hcnknPkFkZCBBcmNoaXRlY3Q8L2J1dHRvbj5cbiAgPHVsPlxuICAgIDxsaSAqbmdGb3I9J2xldCBhcmNoaXRlY3Qgb2YgYXJjaGl0ZWN0cycgKGNsaWNrKT0nYXJjaGl0ZWN0T25DbGljayhhcmNoaXRlY3QpJz57eyBhcmNoaXRlY3QgfX08L2xpPlxuICA8L3VsPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYHVse21hcmdpbi10b3A6MTBweDtwYWRkaW5nOjB9bGl7bGlzdC1zdHlsZTpub25lfWBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGFyY2hpdGVjdHM6IHN0cmluZ1tdO1xuICBuZXdBcmNoaXRlY3ROYW1lOiBzdHJpbmc7XG4gIGJ1czogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGl0bGUgPSAnYXJjaGl0ZWN0cyc7XG4gICAgdGhpcy5hcmNoaXRlY3RzID0gW1xuICAgICAgJ1Nlc2hhbicsXG4gICAgICAnQW5lZXNoJyxcbiAgICAgICdOaWppbCdcbiAgICBdO1xuICAgIHRoaXMuYnVzID0gKEJ1c0ZhY3RvcnkgYXMgYW55KS5jcmVhdGUoKTtcbiAgfVxuXG4gIG5ld0FyY2hpdGVjdE9uS2V5VXAoZXZlbnQpIHtcbiAgICB0aGlzLm5ld0FyY2hpdGVjdE5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gIH1cblxuICBhZGRPbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLm5ld0FyY2hpdGVjdE5hbWUpIHtcbiAgICAgIHRoaXMuYXJjaGl0ZWN0cy5wdXNoKHRoaXMubmV3QXJjaGl0ZWN0TmFtZSk7XG4gICAgICB0aGlzLmJ1cy5ub3RpZnkoe1xuICAgICAgICBldmVudE5hbWU6ICdhcmNoaXRlY3QtYWRkZWQnLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgbmFtZTogdGhpcy5uZXdBcmNoaXRlY3ROYW1lXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5uZXdBcmNoaXRlY3ROYW1lID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBhcmNoaXRlY3RPbkNsaWNrKGFyY2hpdGVjdCkge1xuICAgIHRoaXMuYnVzLm5vdGlmeSh7XG4gICAgICBldmVudE5hbWU6ICdhcmNoaXRlY3Qtc2VsZWN0ZWQnLFxuICAgICAgbWVzc2FnZToge1xuICAgICAgICBuYW1lOiBhcmNoaXRlY3RcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vYXBwLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXBwQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW10sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgZW5hYmxlUHJvZE1vZGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcGxhdGZvcm1Ccm93c2VyRHluYW1pYyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XG5cbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwL2FwcC5tb2R1bGUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbmlmIChlbnZpcm9ubWVudC5wcm9kdWN0aW9uKSB7XG4gIGVuYWJsZVByb2RNb2RlKCk7XG59XG5cbmNvbnN0IGlkID0gJ2Q0MTgxYzIzLTRjMWYtNGMyYS05MTBhLTdkMzgzYWZiOWNkOSc7XG5jb25zdCB0aXRsZSA9ICdBcmNoaXRlY3QgTGlzdCAoQW5ndWxhciA1KSc7XG5jb25zdCB3aWR0aCA9IHtcbiAgeHM6IDEyLFxuICBzbTogOCxcbiAgbWQ6IDYsXG4gIGxnOiA1LFxuICB4bDogNFxufTtcbmNvbnN0IGluaXRpYWxIZWlnaHQgPSAnMjUwcHgnO1xuY29uc3QgcmVuZGVyID0gYXN5bmMgZnVuY3Rpb24oY29udGFpbmVyOiBFbGVtZW50KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFwcFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhcmNoaXRlY3QtbGlzdC13aWRnZXQnKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBSb290KTtcbiAgICAgIGF3YWl0IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZCxcbiAgdGl0bGUsXG4gIHdpZHRoLFxuICBpbml0aWFsSGVpZ2h0LFxuICByZW5kZXJcbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJOZ01vZHVsZSIsIkJyb3dzZXJNb2R1bGUiLCJwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSx1QkE2QzBCLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVM7UUFDdkQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTTtZQUNyRCxtQkFBbUIsS0FBSyxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUFFO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUUsRUFBRTtZQUMzRixrQkFBa0IsS0FBSyxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQUU7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRSxFQUFFO1lBQzlGLGNBQWMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUks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QUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFD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