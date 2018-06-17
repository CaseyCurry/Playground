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
  render: RenderFunc;
  isHidden: boolean;
  isExpanded: boolean;
  isFullScreen: boolean = false;

  private constructor(id: string, title: string, currentWidth: Width, minimumWidth: Width, render: RenderFunc, isHidden: boolean) {
    this.id = id;
    this.title = title;
    this.currentWidth = currentWidth;
    this.minimumWidth = minimumWidth;
    this.render = render;
    this.isHidden = isHidden;
    this.expand();
  }

  static createAvailableWidget(id: string, title: string, width: Width, render: RenderFunc) {
    return new Widget(id, title, width, width, render, false);
  }

  static createRenderedWidget(id: string, title: string, currentWidth: Width, minimumWidth: Width, render: RenderFunc) {
    return new Widget(id, title, currentWidth, minimumWidth, render, false);
  }

  static createHiddenWidget(width: number): Widget {
    return new Widget(
      null,
      null,
      { xs: width },
      { xs: width },
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
      this.render,
      this.isHidden);
  }
}
