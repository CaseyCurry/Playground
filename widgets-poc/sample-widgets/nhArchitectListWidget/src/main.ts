import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = async function(container: Element) {
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

const container: Element = document.getElementsByClassName('container')[0];

bootstrap(container)
  .catch(error => console.log(error));
