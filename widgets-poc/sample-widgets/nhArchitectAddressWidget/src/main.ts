import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './polyfills';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { BusFactory } from './app/bus';

if (environment.production) {
  enableProdMode();
}

const bootstrap = async function(container: Element) {
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

const container: Element = document.getElementsByClassName('container')[0];

bootstrap(container)
  .catch(error => console.log(error));

const bus = BusFactory.create();
const architects = ['Seshan', 'Nijil', 'Aneesh'];
const tester = document.createElement('button');
document.getElementsByClassName('container')[0].appendChild(tester);
tester.innerHTML = 'Scroll';
tester.addEventListener('click', () => {
  const architect = architects.shift();
  bus.notify({
    eventName: 'architect-selected',
    message: {
      name: architect
    }
  });
  architects.push(architect);
});
