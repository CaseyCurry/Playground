import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const id = 'c5d03052-1716-4dfb-a08a-76967051d4cf';
const title = 'Architect Address (Angular 4)';
const width = {
  xs: 12,
  sm: 8,
  md: 6
};
const initialHeight = '250px';
const render = async function(container: HTMLElement) {
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

export default {
  id,
  title,
  width,
  initialHeight,
  render
}
