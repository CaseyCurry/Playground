import { Component, OnInit, Inject, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Subscription } from 'rxjs/Subscription';
import { Widget } from '../widget.model';
import { WidgetComponent } from '../widget/widget.component';
import { SpacerComponent } from '../spacer/spacer.component';
import { Library } from '../library.model';
import { LayoutEditor } from '../layout-editor.model';
import { WidgetsService } from '../widgets.service';
import { BootstrapService } from '../bootstrap.service';

@Component({
  selector: 'app-widgets-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  library: Library;
  layoutEditor: LayoutEditor = new LayoutEditor();
  items: any[];
  resizeGuidelines: any[] = [];

  // All subscriptions must be cleaned up to prevent leaks.
  private moveHoverSubscription: any;
  private mouseUpSubscription: Subscription;
  private touchEndSubscription: Subscription;

  private isOverlayDisplayed: boolean = false;
  private movingWidgetComponent: WidgetComponent;

  @HostListener('window:resize') onResize() {
    if (this.bootstrapService.hasBreakpointChanged()) {
      this.addHorizontalSpacers();
    }
  }

  constructor(
    @Inject(DOCUMENT) private document,
    private widgetsService: WidgetsService,
    private bootstrapService: BootstrapService,
    private elementRef: ElementRef) {
  }

  private preventHighlightingWhileMoving(): void {
    this.document.body.classList.add('no-highlighting');
  }

  private allowHighlighting(): void {
    this.document.body.classList.remove('no-highlighting')
  }

  private createSpacer(): object {
    return {
      spacer: {}
    };
  }

  private clearSpacers(): void {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (this.items[i].spacer) {
        this.items.splice(i, 1);
      }
    }
  }

  private addHorizontalSpacers(): void {
    this.clearSpacers();

    let usedWidthOnRow = 0;
    const indexesToInsertSpacer = [0];

    for (let i = 0; i < this.items.length; i++) {
      const widget = this.items[i].widget || this.items[i].dropTarget;

      if (this.movingWidgetComponent && widget === this.movingWidgetComponent.widget) {
        continue;
      }

      const widgetWidth = this.bootstrapService.getWidth(widget.getCurrentWidth.bind(widget));
      usedWidthOnRow += widgetWidth;

      if (usedWidthOnRow === this.bootstrapService.maxColumns) {
        indexesToInsertSpacer.push(i + 1);
        usedWidthOnRow = 0;
      } else if (usedWidthOnRow > this.bootstrapService.maxColumns) {
        indexesToInsertSpacer.push(i);
        usedWidthOnRow = widgetWidth;
      }
    }

    indexesToInsertSpacer
      .reverse()
      .forEach(x => {
        this.items.splice(x, 0, this.createSpacer());
      });

    if (!this.items[this.items.length - 1].spacer) {
      this.items.push(this.createSpacer());
    }
  }

  private toggleOverlay(): void {
    this.isOverlayDisplayed = !this.isOverlayDisplayed;

    if (this.isOverlayDisplayed) {
      document.getElementById('overlay').style.display = 'block';
    } else {
      document.getElementById('overlay').style.display = 'none';
    }
  }

  ngOnInit(): void {
    const renderedWidgets = this.widgetsService.getRenderedWidgets();
    this.items = renderedWidgets.map(x => {
      return { widget: x };
    });
    this.addHorizontalSpacers();
    const availableWidgets = this.widgetsService.getAvailableWidgets();
    this.library = new Library(renderedWidgets, availableWidgets);
  }

  onEditLibrary(event: any): void {
    this.library.edit(event.pageX, event.pageY);
    this.toggleOverlay();
  }

  onHideLibrary(): void {
    this.library.hide();
    this.toggleOverlay();
  }

  private clearExistingDropTarget(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].dropTarget) {
        this.items.splice(i, 1);
      }
    }
  }

  private isWidgetMovingDown(movingWidget, indexOfDrop) {
    const indexOfWidgetBeforeMove = this.items
      .map(x => x.widget)
      .indexOf(movingWidget);
    return indexOfDrop > indexOfWidgetBeforeMove;
  }

  private insertDropTarget(currentResident: any, newResident: WidgetComponent) {
    if (!newResident) {
      newResident = currentResident;
    }
    this.clearExistingDropTarget();
    const dropTarget = newResident.widget.clone();
    let indexOfDrop: number;

    if (currentResident instanceof SpacerComponent) {
      this.bootstrapService.makeFullWidth(dropTarget.makeFullWidth);
      indexOfDrop = this.items
        .map(x => x.spacer)
        .indexOf(currentResident.spacer);
    } else {
      indexOfDrop = this.items
        .map(x => x.widget)
        .indexOf(currentResident.widget);
      if (this.isWidgetMovingDown(newResident.widget, indexOfDrop)) {
        indexOfDrop++;
      }
    }

    const height = newResident.getHeightInformation().height;
    this.items.splice(indexOfDrop, 0, { dropTarget: dropTarget, height: height });
  }

  onWidgetMove(widgetComponent: WidgetComponent): void {
    this.movingWidgetComponent = widgetComponent;
    this.preventHighlightingWhileMoving();
    this.insertDropTarget(widgetComponent, null);
  }

  onWidgetDropped(): void {
    this.items.splice(
      this.items.map(x => x.widget).indexOf(this.movingWidgetComponent.widget),
      1);
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].dropTarget) {
        this.items.splice(i, 1, { widget: this.movingWidgetComponent.widget });
        break;
      }
    }
    this.allowHighlighting();
    this.movingWidgetComponent = null;
    this.addHorizontalSpacers();
  }

  onWidgetHovered(widgetComponent: WidgetComponent): void {
    if (!this.movingWidgetComponent) {
      return;
    }
    this.moveHoverSubscription = Observable.of({})
      .delay(300)
      .subscribe(() => {
        if (!this.movingWidgetComponent) {
          return;
        }
        this.insertDropTarget(widgetComponent, this.movingWidgetComponent);
        this.addHorizontalSpacers();
      });
  }

  onWidgetUnhovered(): void {
    if (this.moveHoverSubscription) {
      this.moveHoverSubscription.unsubscribe();
      this.moveHoverSubscription = null;
    }
  }

  onSpacerHovered(spacerComponent: SpacerComponent): void {
    if (!this.movingWidgetComponent) {
      return;
    }
    this.moveHoverSubscription = Observable.of({})
      .delay(300)
      .subscribe(() => {
        if (!this.movingWidgetComponent) {
          return;
        }
        this.insertDropTarget(spacerComponent, this.movingWidgetComponent);
        this.addHorizontalSpacers();
      });
  }

  onSpacerUnhovered(): void {
    if (this.moveHoverSubscription) {
      this.moveHoverSubscription.unsubscribe();
      this.moveHoverSubscription = null;
    }
  }

  private findRowContainingWidget(widget: Widget): Widget[] {
    let usedWidthOnCurrentRow: number = 0;
    let widgetIsOnCurrentRow: boolean = false;
    let currentRow: Widget[] = [];

    for (let i = 0; i < this.items.length; i++) {
      if (!this.items[i].widget) {
        continue;
      }

      const widgetWidth = this.bootstrapService
        .getWidth(this.items[i].widget.getCurrentWidth.bind(this.items[i].widget));
      usedWidthOnCurrentRow += widgetWidth;

      if (usedWidthOnCurrentRow < this.bootstrapService.maxColumns) {
        currentRow.push(this.items[i].widget);
      } else if (usedWidthOnCurrentRow === this.bootstrapService.maxColumns) {
        currentRow.push(this.items[i].widget);
        if (widgetIsOnCurrentRow) {
          return currentRow;
        }
        usedWidthOnCurrentRow = 0;
        currentRow = [];
      } else {
        if (widgetIsOnCurrentRow) {
          return currentRow;
        }
        usedWidthOnCurrentRow = widgetWidth;
        currentRow = [this.items[i].widget];
      }

      if (this.items[i].widget === widget) {
        widgetIsOnCurrentRow = true;
      }
    }

    return currentRow;
  }

  private calculateBoundaries(widget: Widget): object {
    const row = this.findRowContainingWidget(widget);
    const totalRowWidth = row
      .map(x => this.bootstrapService.getWidth(x.getCurrentWidth.bind(x)))
      .reduce((x, y) => x + y);
    const currentPosition = row
      .slice(0, row.indexOf(widget) + 1)
      .map(x => this.bootstrapService.getWidth(x.getCurrentWidth.bind(x)))
      .reduce((x, y) => x + y);
    const minimumWidth = this.bootstrapService.getWidth(widget.getMinimumWidth.bind(widget));
    const spaceToMinimize = this.bootstrapService.getWidth(widget.getCurrentWidth.bind(widget)) - minimumWidth;
    // Don't go left far enough to exceed the minimum of the widget.
    const left = currentPosition - spaceToMinimize;
    // Don't go right far enough to exceed the width of the row.
    const right = this.bootstrapService.maxColumns;
    // This is used to determine at which column to start drawing guidelines.
    const offset = minimumWidth - left;
    return { left, right, offset };
  };

  private drawResizeGuidelines(widgetComponent: WidgetComponent): void {
    const heightInformation = widgetComponent.getHeightInformation();
    const boundaries: any = this.calculateBoundaries(widgetComponent.widget);
    for (let i = boundaries.left; i <= boundaries.right; i++) {
      // unshift() which inserts at the beginning of the array instead of push()
      // because we want to display the longest guideline first so that the shorter
      // one is on top of the longer one. This will help when we hover over each one.
      // If the longer one was on top it would be the only guideline raising events.
      this.resizeGuidelines.unshift({
        widthOfGuideline: i,
        targetWidthOfWidget: i + boundaries.offset,
        top: heightInformation.top,
        height: heightInformation.height,
        widget: widgetComponent.widget
      });
    }
  };

  onWidgetResized(widget: Widget): void {
    const indexOfWidget = this.items
      .map(x => x.widget)
      .indexOf(widget);
    this.items.splice(indexOfWidget, 1, { widget });
    this.addHorizontalSpacers();
  }

  private endWidgetResize() {
    this.resizeGuidelines = [];
    this.allowHighlighting();
    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
    }
    if (this.touchEndSubscription) {
      this.touchEndSubscription.unsubscribe();
    }
  }

  onWidgetResizeStarted(widgetComponent): void {
    this.drawResizeGuidelines(widgetComponent);
    this.preventHighlightingWhileMoving();
    this.mouseUpSubscription =
      Observable.fromEvent(this.document, 'mouseup')
        .subscribe(() => {
          this.endWidgetResize();
          if (this.mouseUpSubscription) {
            this.mouseUpSubscription.unsubscribe();
          }
        });
    this.touchEndSubscription =
      Observable.fromEvent(this.document, 'touchend')
        .subscribe(() => {
          this.endWidgetResize();
          if (this.touchEndSubscription) {
            this.touchEndSubscription.unsubscribe();
          }
        });
  }

  onRenderWidget(widget: Widget) {
    this.items.unshift({ widget });
    this.addHorizontalSpacers();
  }

  onDerenderWidget(widget: Widget) {
    this.items
      .filter(x => x.widget && x.widget.id === widget.id)
      .forEach(x => {
        this.items.splice(this.items.indexOf(x), 1);
      });
    this.addHorizontalSpacers();
  }

  onEditLayout(event) {
    this.layoutEditor.edit(event.pageX, event.pageY);
    this.toggleOverlay();
  }

  onHideLayoutEditor() {
    this.layoutEditor.hide();
    this.toggleOverlay();
  }

  onWidgetCloseClick(widget) {
    this.items
      .filter(x => x.widget && x.widget === widget)
      .forEach(x => {
        this.items.splice(this.items.indexOf(x), 1);
      });
    this.addHorizontalSpacers();
  }

  onWidgetToggleFullScreenClick() {
    this.toggleOverlay();
  }

  ngOnDestroy(): void {
    if (this.moveHoverSubscription) {
      this.moveHoverSubscription.unsubscribe();
    }
    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
    }
    if (this.touchEndSubscription) {
      this.touchEndSubscription.unsubscribe();
    }
  }
}
