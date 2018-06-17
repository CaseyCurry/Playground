/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { BusFactory } from './bus';
export class AppComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC8iLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBYW5DLE1BQU07Ozs7SUFNSixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsUUFBUTtZQUNSLFFBQVE7WUFDUixPQUFPO1NBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsbUJBQUMsVUFBaUIsRUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pDOzs7OztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQzVDOzs7O0lBRUQsVUFBVTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ2QsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO2lCQUM1QjthQUNGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7U0FDNUI7S0FDRjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFTO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ2QsU0FBUyxFQUFFLG9CQUFvQjtZQUMvQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDdEU7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7T0FNTDtnQkFDTCxNQUFNLEVBQUUsQ0FBQyxzSEFBc0gsQ0FBQzthQUNqSTs7OztZQWJtQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCdXNGYWN0b3J5IH0gZnJvbSAnLi9idXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcmNoaXRlY3QtbGlzdC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9J2NvbC14cy0xMic+XG4gIDxpbnB1dCAoa2V5dXApPSduZXdBcmNoaXRlY3RPbktleVVwKCRldmVudCknIHBsYWNlaG9sZGVyPSdlbnRlciBuYW1lJyAvPlxuICA8YnV0dG9uIChjbGljayk9J2FkZE9uQ2xpY2soKScgY2xhc3M9J2J0biBidG4tcHJpbWFyeSc+QWRkIEFyY2hpdGVjdDwvYnV0dG9uPlxuICA8dWw+XG4gICAgPGxpICpuZ0Zvcj0nbGV0IGFyY2hpdGVjdCBvZiBhcmNoaXRlY3RzJyAoY2xpY2spPSdhcmNoaXRlY3RPbkNsaWNrKGFyY2hpdGVjdCknPnt7IGFyY2hpdGVjdCB9fTwvbGk+XG4gIDwvdWw+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgOmhvc3QuYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0IHVse21hcmdpbi10b3A6MTBweDtwYWRkaW5nOjB9Omhvc3QuYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0IGxpe2xpc3Qtc3R5bGU6bm9uZTtjb2xvcjpncmVlbn1gXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICB0aXRsZTogc3RyaW5nO1xuICBhcmNoaXRlY3RzOiBzdHJpbmdbXTtcbiAgbmV3QXJjaGl0ZWN0TmFtZTogc3RyaW5nO1xuICBidXM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnRpdGxlID0gJ2FyY2hpdGVjdHMnO1xuICAgIHRoaXMuYXJjaGl0ZWN0cyA9IFtcbiAgICAgICdTZXNoYW4nLFxuICAgICAgJ0FuZWVzaCcsXG4gICAgICAnTmlqaWwnXG4gICAgXTtcbiAgICB0aGlzLmJ1cyA9IChCdXNGYWN0b3J5IGFzIGFueSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZXdBcmNoaXRlY3RPbktleVVwKGV2ZW50KSB7XG4gICAgdGhpcy5uZXdBcmNoaXRlY3ROYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgYWRkT25DbGljaygpIHtcbiAgICBpZiAodGhpcy5uZXdBcmNoaXRlY3ROYW1lKSB7XG4gICAgICB0aGlzLmFyY2hpdGVjdHMucHVzaCh0aGlzLm5ld0FyY2hpdGVjdE5hbWUpO1xuICAgICAgdGhpcy5idXMubm90aWZ5KHtcbiAgICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LWFkZGVkJyxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIG5hbWU6IHRoaXMubmV3QXJjaGl0ZWN0TmFtZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV3QXJjaGl0ZWN0TmFtZSA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgYXJjaGl0ZWN0T25DbGljayhhcmNoaXRlY3QpIHtcbiAgICB0aGlzLmJ1cy5ub3RpZnkoe1xuICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LXNlbGVjdGVkJyxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgbmFtZTogYXJjaGl0ZWN0XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXJjaGl0ZWN0LWxpc3Qtd2lkZ2V0Jyk7XG4gIH1cbn1cbiJdfQ==