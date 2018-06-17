import { ChangeDetectorRef, ElementRef } from '@angular/core';
export interface IAddress {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export declare class AppComponent {
    private changeDetectorRef;
    private elementRef;
    title: string;
    bus: any;
    address: IAddress;
    constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef);
    private getAddress(architect);
    ngAfterContentInit(): void;
}
