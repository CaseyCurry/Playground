import { Widget } from './widget.model';

type LibraryWidget = {
  isRendered: boolean,
  widget: Widget
};

export class Library {
  isDisplayed: boolean = false;
  xPosition: number;
  yPosition: number;
  widgets: LibraryWidget[];

  constructor(private renderedWidgets: Widget[], private availableWidgets: Widget[]) {
    this.buildLibrary();
  }

  private isWidgetRendered(widget): boolean {
    return this.renderedWidgets
      .map(renderedWidget => renderedWidget.id)
      .indexOf(widget.id) >= 0
  }

  private buildLibrary() {
    this.widgets = this.availableWidgets.map(widget => {
      const isRendered = this.isWidgetRendered(widget);
      return { isRendered, widget };
    });
  }

  edit(xPosition: number, yPosition: number) {
    this.isDisplayed = true;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }

  hide() {
    this.isDisplayed = false;
    this.xPosition = null;
    this.yPosition = null;
  }

  renderWidget(widget: Widget): void {
    this.renderedWidgets.push(widget);
    this.buildLibrary();
  }

  derenderWidget(widget: Widget): void {
    this.renderedWidgets
      .filter(x => x.id === widget.id)
      .forEach(x => {
        this.renderedWidgets.splice(this.renderedWidgets.indexOf(x), 1);
      });
    this.buildLibrary();
  }
}
