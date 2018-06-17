/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var appRoot, error_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                appRoot = document.createElement('architect-list-widget');
                                container.appendChild(appRoot);
                                return [4 /*yield*/, platformBrowserDynamic().bootstrapModule(AppModule)];
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
var ɵ0 = render;
export default {
    id: id,
    title: title,
    width: width,
    initialHeight: initialHeight,
    render: render
};
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5hdmloZWFsdGgvYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0LyIsInNvdXJjZXMiOlsid2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUUzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNCLGNBQWMsRUFBRSxDQUFDO0NBQ2xCO0FBRUQscUJBQU0sRUFBRSxHQUFHLHNDQUFzQyxDQUFDO0FBQ2xELHFCQUFNLEtBQUssR0FBRyw0QkFBNEIsQ0FBQztBQUMzQyxxQkFBTSxLQUFLLEdBQUc7SUFDWixFQUFFLEVBQUUsRUFBRTtJQUNOLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0NBQ04sQ0FBQztBQUNGLHFCQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDOUIscUJBQU0sTUFBTSxHQUFHLFVBQWUsU0FBa0I7Ozs7WUFDOUMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Ozs7O2dDQUUvQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dDQUNoRSxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUMvQixxQkFBTSxzQkFBc0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBQTs7Z0NBQXpELFNBQXlELENBQUM7Z0NBQzFELE9BQU8sRUFBRSxDQUFDOzs7O2dDQUVWLE1BQU0sQ0FBQyxPQUFLLENBQUMsQ0FBQzs7Ozs7cUJBRWpCLENBQUMsRUFBQzs7O0NBQ0osQ0FBQzs7QUFFRixlQUFlO0lBQ2IsRUFBRSxJQUFBO0lBQ0YsS0FBSyxPQUFBO0lBQ0wsS0FBSyxPQUFBO0lBQ0wsYUFBYSxlQUFBO0lBQ2IsTUFBTSxRQUFBO0NBQ1AsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVuYWJsZVByb2RNb2RlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuXG5pZiAoZW52aXJvbm1lbnQucHJvZHVjdGlvbikge1xuICBlbmFibGVQcm9kTW9kZSgpO1xufVxuXG5jb25zdCBpZCA9ICdkNDE4MWMyMy00YzFmLTRjMmEtOTEwYS03ZDM4M2FmYjljZDknO1xuY29uc3QgdGl0bGUgPSAnQXJjaGl0ZWN0IExpc3QgKEFuZ3VsYXIgNSknO1xuY29uc3Qgd2lkdGggPSB7XG4gIHhzOiAxMixcbiAgc206IDgsXG4gIG1kOiA2LFxuICBsZzogNSxcbiAgeGw6IDRcbn07XG5jb25zdCBpbml0aWFsSGVpZ2h0ID0gJzI1MHB4JztcbmNvbnN0IHJlbmRlciA9IGFzeW5jIGZ1bmN0aW9uKGNvbnRhaW5lcjogRWxlbWVudCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhcHBSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0Jyk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwUm9vdCk7XG4gICAgICBhd2FpdCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaWQsXG4gIHRpdGxlLFxuICB3aWR0aCxcbiAgaW5pdGlhbEhlaWdodCxcbiAgcmVuZGVyXG59XG4iXX0=