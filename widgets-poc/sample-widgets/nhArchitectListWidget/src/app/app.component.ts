import { Component, ElementRef } from '@angular/core';
import { BusFactory } from './bus';

@Component({
  selector: 'architect-list-widget',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  architects: string[];
  newArchitectName: string;
  bus: any;

  constructor(private elementRef: ElementRef) {
    this.title = 'architects';
    this.architects = [
      'Seshan',
      'Aneesh',
      'Nijil'
    ];
    this.bus = (BusFactory as any).create();
  }

  newArchitectOnKeyUp(event) {
    this.newArchitectName = event.target.value;
  }

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

  architectOnClick(architect) {
    this.bus.notify({
      eventName: 'architect-selected',
      message: {
        name: architect
      }
    });
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('architect-list-widget');
  }
}
