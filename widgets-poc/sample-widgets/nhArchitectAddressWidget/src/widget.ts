import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const render = async function(container: HTMLElement) {
  return new Promise(async (resolve, reject) => {
    try {
      const appRoot = document.createElement('architect-address-widget');
      container.appendChild(appRoot);
      await platformBrowserDynamic().bootstrapModule(AppModule);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const metadata = {
  title: "Architect Address (Angular 4)",
  width: {
    xs: 12,
    md: 8,
    lg: 6
  }
};