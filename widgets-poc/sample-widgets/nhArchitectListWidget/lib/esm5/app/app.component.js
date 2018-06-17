/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { BusFactory } from './bus';
var AppComponent = /** @class */ (function () {
    function AppComponent(elementRef) {
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
    /**
     * @return {?}
     */
    AppComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.classList.add('architect-list-widget');
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'architect-list-widget',
                    template: "<div class='col-xs-12'>\n  <input (keyup)='newArchitectOnKeyUp($event)' placeholder='enter name' />\n  <button (click)='addOnClick()' class='btn btn-primary'>Add Architect</button>\n  <ul>\n    <li *ngFor='let architect of architects' (click)='architectOnClick(architect)'>{{ architect }}</li>\n  </ul>\n</div>",
                    styles: [":host.architect-list-widget ul{margin-top:10px;padding:0}:host.architect-list-widget li{list-style:none;color:green}"]
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
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
    /** @type {?} */
    AppComponent.prototype.elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC8iLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sT0FBTyxDQUFDOztJQW1CakMsc0JBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixRQUFRO1lBQ1IsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBQyxVQUFpQixFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekM7Ozs7O0lBRUQsMENBQW1COzs7O0lBQW5CLFVBQW9CLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQzVDOzs7O0lBRUQsaUNBQVU7OztJQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDZCxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7aUJBQzVCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztTQUM1QjtLQUNGOzs7OztJQUVELHVDQUFnQjs7OztJQUFoQixVQUFpQixTQUFTO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ2QsU0FBUyxFQUFFLG9CQUFvQjtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELHlDQUFrQjs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3RFOztnQkF2REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSx3VEFNTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxzSEFBc0gsQ0FBQztpQkFDakk7Ozs7Z0JBYm1CLFVBQVU7O3VCQUE5Qjs7U0FjYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXNGYWN0b3J5IH0gZnJvbSAnLi9idXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcmNoaXRlY3QtbGlzdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2NvbC14cy0xMic+XG4gIDxpbnB1dCAoa2V5dXApPSduZXdBcmNoaXRlY3RPbktleVVwKCRldmVudCknIHBsYWNlaG9sZGVyPSdlbnRlciBuYW1lJyAvPlxuICA8YnV0dG9uIChjbGljayk9J2FkZE9uQ2xpY2soKScgY2xhc3M9J2J0biBidG4tcHJpbWFyeSc+QWRkIEFyY2hpdGVjdDwvYnV0dG9uPlxuICA8dWw+XG4gICAgPGxpICpuZ0Zvcj0nbGV0IGFyY2hpdGVjdCBvZiBhcmNoaXRlY3RzJyAoY2xpY2spPSdhcmNoaXRlY3RPbkNsaWNrKGFyY2hpdGVjdCknPnt7IGFyY2hpdGVjdCB9fTwvbGk+XG4gIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgOmhvc3QuYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0IHVse21hcmdpbi10b3A6MTBweDtwYWRkaW5nOjB9Omhvc3QuYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0IGxpe2xpc3Qtc3R5bGU6bm9uZTtjb2xvcjpncmVlbn1gXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICB0aXRsZTogc3RyaW5nO1xuICBhcmNoaXRlY3RzOiBzdHJpbmdbXTtcbiAgbmV3QXJjaGl0ZWN0TmFtZTogc3RyaW5nO1xuICBidXM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnRpdGxlID0gJ2FyY2hpdGVjdHMnO1xuICAgIHRoaXMuYXJjaGl0ZWN0cyA9IFtcbiAgICAgICdTZXNoYW4nLFxuICAgICAgJ0FuZWVzaCcsXG4gICAgICAnTmlqaWwnXG4gICAgXTtcbiAgICB0aGlzLmJ1cyA9IChCdXNGYWN0b3J5IGFzIGFueSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZXdBcmNoaXRlY3RPbktleVVwKGV2ZW50KSB7XG4gICAgdGhpcy5uZXdBcmNoaXRlY3ROYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgYWRkT25DbGljaygpIHtcbiAgICBpZiAodGhpcy5uZXdBcmNoaXRlY3ROYW1lKSB7XG4gICAgICB0aGlzLmFyY2hpdGVjdHMucHVzaCh0aGlzLm5ld0FyY2hpdGVjdE5hbWUpO1xuICAgICAgdGhpcy5idXMubm90aWZ5KHtcbiAgICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LWFkZGVkJyxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIG5hbWU6IHRoaXMubmV3QXJjaGl0ZWN0TmFtZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV3QXJjaGl0ZWN0TmFtZSA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgYXJjaGl0ZWN0T25DbGljayhhcmNoaXRlY3QpIHtcbiAgICB0aGlzLmJ1cy5ub3RpZnkoe1xuICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LXNlbGVjdGVkJyxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgbmFtZTogYXJjaGl0ZWN0XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0Jyk7XG4gIH1cbn1cbiJdfQ==