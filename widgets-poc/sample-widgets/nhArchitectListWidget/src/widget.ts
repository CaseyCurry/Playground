import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const id = 'd4181c23-4c1f-4c2a-910a-7d383afb9cd9';
const title = 'Architect List (Angular 5)';
const width = {
  xs: 12,
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4
};
const initialHeight = '250px';
const render = async function(container: Element) {
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

export default {
  id,
  title,
  width,
  initialHeight,
  render
}
