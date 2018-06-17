type RenderFunc = (HtmlElement) => Promise<void>;

type Width = {
  xs: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number
};

export class Widget {
  id: string;
  title: string;
  currentWidth: Width;
  minimumWidth: Width;
  initialHeight: string;
  render: RenderFunc;
  isHidden: boolean;
  isExpanded: boolean = true;
  isFullScreen: boolean = false;

  private constructor(id: string, title: string, currentWidth: Width, minimumWidth: Width, initialHeight: string, render: RenderFunc, isHidden: boolean) {
    this.id = id;
    this.title = title;
    this.currentWidth = currentWidth;
    this.minimumWidth = minimumWidth;
    this.initialHeight = initialHeight;
    this.render = (render as any).bind(this);
    this.isHidden = isHidden;
  }

  static createAvailableWidget({ id, title, width, initialHeight, render }) {
    return new Widget(id, title, width, width, initialHeight, render, false);
  }

  static createRenderedWidget({ id, title, currentWidth, minimumWidth, initialHeight, render }) {
    return new Widget(id, title, currentWidth, minimumWidth, initialHeight, render, false);
  }

  static createHiddenWidget(width: number): Widget {
    return new Widget(
      null,
      null,
      { xs: width },
      { xs: width },
      null,
      (container): Promise<void> => {
        return new Promise(resolve => {
          const content = document.createElement('div');
          container.appendChild(content);
          resolve();
        });
      },
      true);
  }

  getCurrentWidth(breakpoint: string) {
    return this.currentWidth[breakpoint];
  }

  getMinimumWidth(breakpoint: string) {
    return this.minimumWidth[breakpoint];
  }

  makeFullWidth(breakpoint: string) {
    if (this.currentWidth[breakpoint]) {
      this.currentWidth[breakpoint];
    }
  }

  resize(breakpoint: string, width: number): void {
    this.currentWidth[breakpoint] = width;
  }

  expand(): void {
    this.isExpanded = true;
  }

  collapse(): void {
    this.isExpanded = false;
  }

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }

  clone(): Widget {
    return new Widget(
      this.id,
      this.title,
      this.currentWidth,
      this.minimumWidth,
      this.initialHeight,
      this.render,
      this.isHidden);
  }
}
