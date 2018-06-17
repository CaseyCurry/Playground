import { Component } from '@angular/core';
import busFactory from 'nh-browser-bus';
console.log(busFactory);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  patients: string[];
  newPatientName: string;
  bus: any;

  constructor() {
    this.title = 'Patient List';
    this.patients = [
      'Seshan',
      'Nijil',
      'Aneesh'
    ];
    this.bus = busFactory.create();
    this.bus.listen({
      eventName: 'patient-added',
      respond: (event) => {
        this.patients.push(event.message.name);
      }
    })
  }

  addPatientOnClick() {
    if (this.newPatientName) {
      this.bus.notify({
        eventName: "patient-added",
        message: {
          name: this.newPatientName
        }
      });
      this.newPatientName = "";
    }
  }

  onKeyUp(event) {
    this.newPatientName = event.target.value;
  }
}
