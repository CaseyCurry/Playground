import { ChangeDetectorRef } from '@angular/core';
export interface IAddress {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export declare class AppComponent {
    private ref;
    title: string;
    bus: any;
    address: IAddress;
    constructor(ref: ChangeDetectorRef);
    private getAddress(architect);
}
