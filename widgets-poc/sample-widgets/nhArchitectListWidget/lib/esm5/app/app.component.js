/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BusFactory } from './bus';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
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
        { type: Component, args: [{
                    selector: 'architect-list-widget',
                    template: "<div class='col-xs-12'>\n  <input (keyup)='newArchitectOnKeyUp($event)' placeholder='enter name' />\n  <button (click)='addOnClick()' class='btn btn-primary'>Add Architect</button>\n  <ul>\n    <li *ngFor='let architect of architects' (click)='architectOnClick(architect)'>{{ architect }}</li>\n  </ul>\n</div>",
                    styles: ["ul{margin-top:10px;padding:0}li{list-style:none}"]
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return []; };
    return AppComponent;
}());
export { AppComponent };
function AppComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AppComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AppComponent.ctorParameters;
    /** @type {?} */
    AppComponent.prototype.title;
    /** @type {?} */
    AppComponent.prototype.architects;
    /** @type {?} */
    AppComponent.prototype.newArchitectName;
    /** @type {?} */
    AppComponent.prototype.bus;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC8iLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxPQUFPLENBQUM7O0lBbUJqQztRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsUUFBUTtZQUNSLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQUMsVUFBaUIsRUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUVELDBDQUFtQjs7OztJQUFuQixVQUFvQixLQUFLO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUM1Qzs7OztJQUVELGlDQUFVOzs7SUFBVjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2QsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2lCQUM1QjthQUNGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7U0FDNUI7S0FDRjs7Ozs7SUFFRCx1Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsU0FBUztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNkLFNBQVMsRUFBRSxvQkFBb0I7WUFDL0IsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFBO0tBQ0g7O2dCQW5ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHdUQU1MO29CQUNMLE1BQU0sRUFBRSxDQUFDLGtEQUFrRCxDQUFDO2lCQUM3RDs7Ozt1QkFiRDs7U0FjYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXNGYWN0b3J5IH0gZnJvbSAnLi9idXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcmNoaXRlY3QtbGlzdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2NvbC14cy0xMic+XG4gIDxpbnB1dCAoa2V5dXApPSduZXdBcmNoaXRlY3RPbktleVVwKCRldmVudCknIHBsYWNlaG9sZGVyPSdlbnRlciBuYW1lJyAvPlxuICA8YnV0dG9uIChjbGljayk9J2FkZE9uQ2xpY2soKScgY2xhc3M9J2J0biBidG4tcHJpbWFyeSc+QWRkIEFyY2hpdGVjdDwvYnV0dG9uPlxuICA8dWw+XG4gICAgPGxpICpuZ0Zvcj0nbGV0IGFyY2hpdGVjdCBvZiBhcmNoaXRlY3RzJyAoY2xpY2spPSdhcmNoaXRlY3RPbkNsaWNrKGFyY2hpdGVjdCknPnt7IGFyY2hpdGVjdCB9fTwvbGk+XG4gIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgdWx7bWFyZ2luLXRvcDoxMHB4O3BhZGRpbmc6MH1saXtsaXN0LXN0eWxlOm5vbmV9YF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgYXJjaGl0ZWN0czogc3RyaW5nW107XG4gIG5ld0FyY2hpdGVjdE5hbWU6IHN0cmluZztcbiAgYnVzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50aXRsZSA9ICdhcmNoaXRlY3RzJztcbiAgICB0aGlzLmFyY2hpdGVjdHMgPSBbXG4gICAgICAnU2VzaGFuJyxcbiAgICAgICdBbmVlc2gnLFxuICAgICAgJ05pamlsJ1xuICAgIF07XG4gICAgdGhpcy5idXMgPSAoQnVzRmFjdG9yeSBhcyBhbnkpLmNyZWF0ZSgpO1xuICB9XG5cbiAgbmV3QXJjaGl0ZWN0T25LZXlVcChldmVudCkge1xuICAgIHRoaXMubmV3QXJjaGl0ZWN0TmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIGFkZE9uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMubmV3QXJjaGl0ZWN0TmFtZSkge1xuICAgICAgdGhpcy5hcmNoaXRlY3RzLnB1c2godGhpcy5uZXdBcmNoaXRlY3ROYW1lKTtcbiAgICAgIHRoaXMuYnVzLm5vdGlmeSh7XG4gICAgICAgIGV2ZW50TmFtZTogJ2FyY2hpdGVjdC1hZGRlZCcsXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICBuYW1lOiB0aGlzLm5ld0FyY2hpdGVjdE5hbWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm5ld0FyY2hpdGVjdE5hbWUgPSBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIGFyY2hpdGVjdE9uQ2xpY2soYXJjaGl0ZWN0KSB7XG4gICAgdGhpcy5idXMubm90aWZ5KHtcbiAgICAgIGV2ZW50TmFtZTogJ2FyY2hpdGVjdC1zZWxlY3RlZCcsXG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgIG5hbWU6IGFyY2hpdGVjdFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==