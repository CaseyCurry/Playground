/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BusFactory } from './bus';
export class AppComponent {
    constructor() {
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
                styles: [`ul{margin-top:10px;padding:0}li{list-style:none}`]
            },] },
];
/** @nocollapse */
AppComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuYXZpaGVhbHRoL2FyY2hpdGVjdC1saXN0LXdpZGdldC8iLCJzb3VyY2VzIjpbImFwcC9hcHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFhbkMsTUFBTTtJQU1KO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNoQixRQUFRO1lBQ1IsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxtQkFBQyxVQUFpQixFQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekM7Ozs7O0lBRUQsbUJBQW1CLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDNUM7Ozs7SUFFRCxVQUFVO1FBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDZCxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7aUJBQzVCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztTQUM1QjtLQUNGOzs7OztJQUVELGdCQUFnQixDQUFDLFNBQVM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDZCxTQUFTLEVBQUUsb0JBQW9CO1lBQy9CLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGLENBQUMsQ0FBQTtLQUNIOzs7WUFuREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7O09BTUw7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsa0RBQWtELENBQUM7YUFDN0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1c0ZhY3RvcnkgfSBmcm9tICcuL2J1cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FyY2hpdGVjdC1saXN0LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz0nY29sLXhzLTEyJz5cbiAgPGlucHV0IChrZXl1cCk9J25ld0FyY2hpdGVjdE9uS2V5VXAoJGV2ZW50KScgcGxhY2Vob2xkZXI9J2VudGVyIG5hbWUnIC8+XG4gIDxidXR0b24gKGNsaWNrKT0nYWRkT25DbGljaygpJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5Jz5BZGQgQXJjaGl0ZWN0PC9idXR0b24+XG4gIDx1bD5cbiAgICA8bGkgKm5nRm9yPSdsZXQgYXJjaGl0ZWN0IG9mIGFyY2hpdGVjdHMnIChjbGljayk9J2FyY2hpdGVjdE9uQ2xpY2soYXJjaGl0ZWN0KSc+e3sgYXJjaGl0ZWN0IH19PC9saT5cbiAgPC91bD5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2B1bHttYXJnaW4tdG9wOjEwcHg7cGFkZGluZzowfWxpe2xpc3Qtc3R5bGU6bm9uZX1gXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuICB0aXRsZTogc3RyaW5nO1xuICBhcmNoaXRlY3RzOiBzdHJpbmdbXTtcbiAgbmV3QXJjaGl0ZWN0TmFtZTogc3RyaW5nO1xuICBidXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRpdGxlID0gJ2FyY2hpdGVjdHMnO1xuICAgIHRoaXMuYXJjaGl0ZWN0cyA9IFtcbiAgICAgICdTZXNoYW4nLFxuICAgICAgJ0FuZWVzaCcsXG4gICAgICAnTmlqaWwnXG4gICAgXTtcbiAgICB0aGlzLmJ1cyA9IChCdXNGYWN0b3J5IGFzIGFueSkuY3JlYXRlKCk7XG4gIH1cblxuICBuZXdBcmNoaXRlY3RPbktleVVwKGV2ZW50KSB7XG4gICAgdGhpcy5uZXdBcmNoaXRlY3ROYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgYWRkT25DbGljaygpIHtcbiAgICBpZiAodGhpcy5uZXdBcmNoaXRlY3ROYW1lKSB7XG4gICAgICB0aGlzLmFyY2hpdGVjdHMucHVzaCh0aGlzLm5ld0FyY2hpdGVjdE5hbWUpO1xuICAgICAgdGhpcy5idXMubm90aWZ5KHtcbiAgICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LWFkZGVkJyxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIG5hbWU6IHRoaXMubmV3QXJjaGl0ZWN0TmFtZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV3QXJjaGl0ZWN0TmFtZSA9IFwiXCI7XG4gICAgfVxuICB9XG5cbiAgYXJjaGl0ZWN0T25DbGljayhhcmNoaXRlY3QpIHtcbiAgICB0aGlzLmJ1cy5ub3RpZnkoe1xuICAgICAgZXZlbnROYW1lOiAnYXJjaGl0ZWN0LXNlbGVjdGVkJyxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgbmFtZTogYXJjaGl0ZWN0XG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIl19