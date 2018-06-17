import { Injectable } from '@angular/core';
import { Widget } from './widget.model';

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
          while (container.lastChild) {
            container.removeChild(container.lastChild);
          }
          container.appendChild(content);
          resolve();
        }, (timeout || 2000));
      });
    }
  }

  getAvailableWidgets() {
    return [
      Widget.createAvailableWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 4
        },
        this.createRenderFunc(1)),
      Widget.createAvailableWidget(
        '2',
        'Widget 2',
        {
          xs: 12,
          sm: 8
        },
        this.createRenderFunc(2, 1)),
      Widget.createAvailableWidget(
        '3',
        'Widget 3',
        {
          xs: 12,
          sm: 6
        },
        this.createRenderFunc(3)),
      Widget.createAvailableWidget(
        '4',
        'Widget 4',
        {
          xs: 12,
          sm: 6
        },
        this.createRenderFunc(4))
    ]
  }

  getRenderedWidgets() {
    return [
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 6
        },
        {
          xs: 12,
          sm: 5
        },
        this.createRenderFunc(1, 1)),
      Widget.createRenderedWidget(
        '3',
        'Widget 3',
        {
          xs: 12,
          sm: 6
        },
        {
          xs: 12,
          sm: 3
        },
        this.createRenderFunc(3, 1000)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 8
        },
        {
          xs: 12,
          sm: 8
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 5
        },
        {
          xs: 12,
          sm: 5
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 7
        },
        {
          xs: 12,
          sm: 7
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 4
        },
        {
          xs: 12,
          sm: 4
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 4
        },
        {
          xs: 12,
          sm: 4
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 4
        },
        {
          xs: 12,
          sm: 4
        },
        this.createRenderFunc(1)),
      Widget.createRenderedWidget(
        '1',
        'Widget 1',
        {
          xs: 12,
          sm: 4
        },
        {
          xs: 12,
          sm: 4
        },
        this.createRenderFunc(1))
    ];
  }
}
