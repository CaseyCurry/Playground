import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BusFactory } from './bus';

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

@Component({
  selector: 'architect-address-widget',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title: string;
  bus: any;
  address: IAddress;

  constructor(private ref: ChangeDetectorRef) {
    this.title = 'address';
    this.bus = BusFactory.create();
    this.bus.listen({
      eventName: 'architect-selected',
      responder: (event) => {
        this.address = this.getAddress(event.message.name);
        ref.detectChanges();
      }
    });
  }

  private getAddress(architect): IAddress {
    switch (architect) {
      case 'Seshan':
        return {
          line1: '123 Scenic Dr',
          line2: 'Apt 43',
          city: 'Nashville',
          state: 'TN',
          postalCode: '37203',
          country: 'US'
        };
      case 'Nijil':
        return {
          line1: '456 Pearl St',
          city: 'Nashville',
          state: 'TN',
          postalCode: '37203',
          country: 'US'
        };
      case 'Aneesh':
        return {
          line1: '789 Main St',
          city: 'Nashville',
          state: 'TN',
          postalCode: '37203',
          country: 'US'
        };
      default:
        return {
          line1: 'Corner of 65 and Charlotte',
          city: 'Nashville',
          state: 'TN',
          postalCode: '37203',
          country: 'US'
        };
    }
  }
}
