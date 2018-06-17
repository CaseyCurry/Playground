export class LayoutEditor {
  isDisplayed: boolean = false;
  xPosition: number;
  yPosition: number;

  constructor() { }

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
}
