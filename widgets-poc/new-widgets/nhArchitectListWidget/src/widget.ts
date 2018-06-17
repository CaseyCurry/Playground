import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const render = async function(container: HTMLElement) {
  return new Promise(async (resolve, reject) => {
    try {
      const appRoot = document.createElement('architect-list-widget');
      container.appendChild(appRoot);
      await platformBrowserDynamic().bootstrapModule(AppModule);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const metadata = {
  title: "Architect List (Angular 5)",
  width: {
    xs: 6,
    sm: 5,
    md: 4
  }
};
