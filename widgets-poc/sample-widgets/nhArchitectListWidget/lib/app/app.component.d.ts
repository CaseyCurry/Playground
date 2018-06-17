import { ElementRef } from '@angular/core';
export declare class AppComponent {
    private elementRef;
    title: string;
    architects: string[];
    newArchitectName: string;
    bus: any;
    constructor(elementRef: ElementRef);
    newArchitectOnKeyUp(event: any): void;
    addOnClick(): void;
    architectOnClick(architect: any): void;
    ngAfterContentInit(): void;
}
