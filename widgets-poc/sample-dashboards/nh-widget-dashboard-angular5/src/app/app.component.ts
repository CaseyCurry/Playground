import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // host: { '(click)': 'onClick()' }
})
export class AppComponent {
  title = 'app';
  private onClick() {
    console.log("ul clicked!");
  }
}
