import { Injectable } from '@angular/core';
import { Widget } from './widget.model';
import * as ArchitectListWidgetNamespace from '@navihealth/architect-list-widget';
import * as ArchitectAddressWidgetNamespace from '@navihealth/architect-address-widget';
const ArchitectListWidget = (ArchitectListWidgetNamespace as any).default;
const ArchitectAddressWidget = (ArchitectAddressWidgetNamespace as any).default;

@Injectable()
export class WidgetsService {
  constructor() { }

  private createRenderFunc(number: number, timeout?: number) {
    return function(container): Promise<void> {
      return new Promise(resolve => {
        setTimeout(function() {
          const content = document.createElement('div');
          content.innerHTML = '<div>widget ' + number + '</div><input />';
          content.style.height = '200px';
          container.appendChild(content);
          resolve();
        }, (timeout || 2000));
      });
    }
  }

  getAvailableWidgets() {
    return [
      Widget.createAvailableWidget(ArchitectListWidget),
      Widget.createAvailableWidget({
        id: '1',
        title: 'Widget 1',
        width: {
          xs: 12,
          sm: 4
        },
        initialHeight: '200px',
        render: this.createRenderFunc(1)
      }),
      Widget.createAvailableWidget({
        id: '2',
        title: 'Widget 2 Fast',
        width: {
          xs: 12,
          sm: 8
        },
        initialHeight: '200px',
        render: this.createRenderFunc(2, 1)
      }),
      Widget.createAvailableWidget({
        id: '3',
        title: 'Widget 3',
        width: {
          xs: 12,
          sm: 6
        },
        initialHeight: '200px',
        render: this.createRenderFunc(3)
      }),
      Widget.createAvailableWidget({
        id: '4',
        title: 'Widget 4 Slow',
        width: {
          xs: 12,
          sm: 6
        },
        initialHeight: '200px',
        render: this.createRenderFunc(4, 5000)
      })
    ]
  }

  getRenderedWidgets() {
    return [
      Widget.createRenderedWidget(Object.assign({}, ArchitectListWidget, {
        minimumWidth: ArchitectListWidget.width,
        currentWidth: ArchitectListWidget.width
      })),
      Widget.createRenderedWidget(Object.assign({}, ArchitectAddressWidget, {
        minimumWidth: ArchitectAddressWidget.width,
        currentWidth: ArchitectAddressWidget.width
      })),
      Widget.createRenderedWidget({
        id: '1',
        title: 'Widget 1 Very Slow',
        currentWidth: {
          xs: 12,
          sm: 6
        },
        minimumWidth: {
          xs: 12,
          sm: 5
        },
        initialHeight: '200px',
        render: this.createRenderFunc(1, 100000)
      }),
      Widget.createRenderedWidget({
        id: '3',
        title: 'Widget 3',
        currentWidth: {
          xs: 12,
          sm: 6
        },
        minimumWidth: {
          xs: 12,
          sm: 3
        },
        initialHeight: '200px',
        render: this.createRenderFunc(3, 1000)
      }),
      Widget.createRenderedWidget({
        id: '1',
        title: 'Widget 1',
        currentWidth: {
          xs: 12,
          sm: 8
        },
        minimumWidth: {
          xs: 12,
          sm: 8
        },
        initialHeight: '200px',
        render: this.createRenderFunc(1)
      }),
      Widget.createRenderedWidget({
        id: '1',
        title: 'Widget 1',
        currentWidth: {
          xs: 12,
          sm: 5
        },
        minimumWidth: {
          xs: 12,
          sm: 5
        },
        initialHeight: '200px',
        render: this.createRenderFunc(1)
      })
    ];
  }
}
