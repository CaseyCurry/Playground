import { Injectable } from '@angular/core';
import { Widget } from './widget.model';

@Injectable()
export class BootstrapService {
  readonly maxColumns = 12;
  readonly columnPrefix = 'col-';

  // These must remain in order from largest to smallest.
  private readonly breakpoints = {
    xl: 'd-xl-none',
    lg: 'd-lg-none',
    md: 'd-md-none',
    sm: 'd-sm-none',
    xs: 'd-none'
  };
  private currentBreakpoint: string;

  constructor() { }

  // Add an element to the DOM and set it's class to prevent it from displaying
  // at each breakpoint until it is, in fact, not displayed. That is the size of
  // the screen.
  private getCurrentBreakpoint(): string {
    let breakpoint = '';

    const marker = document.createElement('div');
    marker.style.visibility = 'hidden'
    document.body.appendChild(marker);
    const breakpointKeys = Object.keys(this.breakpoints);

    for (let i = 0; i < breakpointKeys.length; i++) {
      breakpoint = breakpointKeys[i];
      marker.classList.add(this.breakpoints[breakpoint]);
      const style = window.getComputedStyle(marker);
      if (style.display === 'none') {
        break;
      }
    }

    marker.remove();
    return breakpoint;
  }

  hasBreakpointChanged() {
    const breakpoint: string = this.getCurrentBreakpoint();
    if (breakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = breakpoint;
      return true;
    }
    return false;
  }

  getWidth(getWidth: (string) => number): number {
    let breakpoint = this.getCurrentBreakpoint();
    let width = getWidth(breakpoint);
    if (!width) {
      // Look for the largest breakpoint with a width that is smaller than the current breakpoint.
      const smallerBreakpoints = this.getSmallerBreakpoints(breakpoint);
      while (!width && smallerBreakpoints.length) {
        breakpoint = smallerBreakpoints.shift();
        width = getWidth(breakpoint);
      }
    }
    return width;
  }

  makeFullWidth(makeFullWidth: (string) => void): void {
    let breakpoint = this.getCurrentBreakpoint();
    // Make each breakpoint at the current size and smaller the full width of a row.
    this.getSmallerBreakpoints(breakpoint)
      .concat([breakpoint])
      .forEach(x => {
        makeFullWidth(x);
      });
  }

  resize(widget: Widget, targetWidthOfWidget: number): void {
    let breakpoint = this.getCurrentBreakpoint();
    let width = widget.getCurrentWidth(breakpoint);
    if (!width) {
      // Look for the largest breakpoint with a width that is smaller than the current breakpoint.
      const smallerBreakpoints = this.getSmallerBreakpoints(breakpoint);
      while (!width && smallerBreakpoints.length) {
        breakpoint = smallerBreakpoints.shift();
        width = widget.getCurrentWidth(breakpoint);
      }
    }
    widget.resize(breakpoint, targetWidthOfWidget);
  }

  getClasses(widget: Widget): string[] {
    return Object.keys(widget.currentWidth)
      .map(x => {
        const width = widget.currentWidth[x];
        if (x === 'xs') {
          return 'col-' + width;
        }
        return 'col-' + x + '-' + width;
      });
  }

  private getSmallerBreakpoints(breakpoint): string[] {
    const allBreakpoints = Object.keys(this.breakpoints);
    const smallerBreakpoints = allBreakpoints.slice(
      allBreakpoints.indexOf(breakpoint) + 1,
      allBreakpoints.length);
    return smallerBreakpoints;
  }
}
