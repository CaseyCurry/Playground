import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import "./polyfills";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function render(container) {
  const appRoot = document.createElement("app-root");
  container.appendChild(appRoot);

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
};

export const metadata = {
  title: "Patient List Via Packaged Angular 5",
  defaultSize: {
    height: 4,
    width: 4
  }
}
