import { Component, OnInit, Input, Output, ElementRef, EventEmitter, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Widget } from '../widget.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { BootstrapService } from '../bootstrap.service';

type Coordinates = {
  x: number,
  y: number
};

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() widgetMoving = new EventEmitter<WidgetComponent>();
  @Output() widgetDropped = new EventEmitter<void>();
  @Output() widgetHovered = new EventEmitter<WidgetComponent>();
  @Output() widgetUnhovered = new EventEmitter<void>();
  @Output() resizeStarted = new EventEmitter<WidgetComponent>();
  @Output() close = new EventEmitter<Widget>();
  @Output() fullscreen = new EventEmitter<void>();

  // All subscriptions must be cleaned up to prevent leaks.
  private mouseMoveSubscription: Subscription;
  private mouseUpSubscription: Subscription;
  private touchMoveSubscription: Subscription;
  private touchEndSubscription: Subscription;

  private moveStartPosition: Coordinates;
  private initialPosition: Coordinates;

  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef,
    private zone: NgZone,
    private bootstrapService: BootstrapService) { }

  ngOnInit() { }

  private getUserPosition(e): Coordinates {
    return e.changedTouches ?
      {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      } : {
        x: e.pageX,
        y: e.pageY
      };
  }

  private notModifiable() {
    if (this.widget.isFullScreen) {
      return true;
    }
  }

  private notGrabbable(e) {
    if (this.notModifiable()) {
      return true;
    }
    const target = e.target || e.srcElement;
    if (target.classList.contains('not-grabbable')) {
      return true;
    }
    if (target.closest('.not-grabbable')) {
      return true;
    }
    return false;
  }

  private startMove(e) {
    this.widgetMoving.emit(this);

    const thisElement = this.elementRef.nativeElement;

    // We'll reset the style when we call endMove.
    this.initialPosition = {
      y: thisElement.style.top,
      x: thisElement.style.left
    };

    // Make the dragging widget follow the user's movement.
    const userPosition = this.getUserPosition(e);
    this.moveStartPosition = {
      x: e.touches ?
        e.touches[0].pageX - thisElement.offsetLeft :
        e.pageX - thisElement.offsetLeft,
      y: e.touches ?
        e.touches[0].pageY - thisElement.offsetTop :
        e.pageY - thisElement.offsetTop
    };
    thisElement.style.left = (userPosition.x - this.moveStartPosition.x) + 'px';
    thisElement.style.top = (userPosition.y - this.moveStartPosition.y) + 'px';

    thisElement.classList.add('moving-widget');
  };

  private move(e) {
    // Make the widget follow the user's movement.
    const userPosition = this.getUserPosition(e);
    this.elementRef.nativeElement.style.left = (userPosition.x - this.moveStartPosition.x) + "px";
    this.elementRef.nativeElement.style.top = (userPosition.y - this.moveStartPosition.y) + "px";
  }

  private endMove() {
    this.widgetDropped.emit();
    this.elementRef.nativeElement.classList.remove('moving-widget');
    this.elementRef.nativeElement.style.top = this.initialPosition.y;
    this.elementRef.nativeElement.style.left = this.initialPosition.x;
  }

  getHeightInformation(): any {
    const rect = this.elementRef.nativeElement
      .getBoundingClientRect();
    return {
      height: rect.height,
      top: rect.top
    }
  }

  onWidgetMouseDown(e: any): void {
    if (this.notGrabbable(e)) {
      return;
    }
    this.startMove(e);
    // Make sure these observers are removed in endMove.
    this.mouseMoveSubscription =
      Observable.fromEvent(this.document, 'mousemove')
        .subscribe(e => {
          this.zone.runOutsideAngular(() => {
            this.move(e);
          });
        });
    this.mouseUpSubscription =
      Observable.fromEvent(this.document, 'mouseup')
        .subscribe(e => {
          this.endMove();
          if (this.mouseMoveSubscription) {
            this.mouseMoveSubscription.unsubscribe();
          }
          if (this.mouseUpSubscription) {
            this.mouseUpSubscription.unsubscribe();
          }
        });
  }

  onWidgetTouchStart(e) {
    if (this.notGrabbable(e)) {
      return;
    }
    this.startMove(e);
    // Make sure these observers are removed in endMove.
    this.touchMoveSubscription =
      Observable.fromEvent(this.document, 'touchmove')
        .subscribe(e => {
          this.zone.runOutsideAngular(() => {
            this.move(e);
          });
        });
    this.touchEndSubscription =
      Observable.fromEvent(this.document, 'touchend')
        .subscribe(() => {
          this.endMove();
          if (this.touchMoveSubscription) {
            this.touchMoveSubscription.unsubscribe();
          }
          if (this.touchEndSubscription) {
            this.touchEndSubscription.unsubscribe();
          }
        });
  }

  onWidgetMouseEnter() {
    this.widgetHovered.emit(this);
  }

  onWidgetTouchEnter() {
    this.widgetHovered.emit(this);
  }

  onWidgetMouseLeave() {
    this.widgetUnhovered.emit();
  }

  onWidgetTouchLeave() {
    this.widgetUnhovered.emit();
  }

  onResizerMouseDown() {
    if (this.notModifiable()) {
      return true;
    }
    this.resizeStarted.emit(this);
  }

  onResizerTouchStart() {
    if (this.notModifiable()) {
      return true;
    }
    this.resizeStarted.emit(this);
  }

  onCloseClick() {
    this.close.emit(this.widget);
  }

  onToggleFullScreenClick() {
    console.log('toggle');
    this.widget.toggleFullScreen();
    if (this.widget.isFullScreen) {
      this.elementRef.nativeElement.classList.add('fullscreen');
    } else {
      this.elementRef.nativeElement.classList.remove('fullscreen');
    }
    console.log('toggle');
    this.fullscreen.emit();
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('widget');
    const classes: string[] = this.bootstrapService.getClasses(this.widget);
    this.elementRef.nativeElement.classList.add(...classes);
    if (this.widget.isHidden) {
      this.elementRef.nativeElement.style.visibility = 'hidden';
    }
  }

  ngAfterViewInit() {
    // If the widget is also Angular 2+, it's bootstrapping will cause Zone errors
    // in the console because Zone is loaded as a singleton. Fun. Run outside Angular.
    this.zone.runOutsideAngular(() => {
      const container = this.elementRef.nativeElement.querySelector('.container');
      this.widget.render(container)
        .then(() => {
          // hide spinner
        });

    });
  }

  ngOnDestroy() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
    if (this.mouseUpSubscription) {
      this.mouseUpSubscription.unsubscribe();
    }
    if (this.touchMoveSubscription) {
      this.touchMoveSubscription.unsubscribe();
    }
    if (this.touchEndSubscription) {
      this.touchEndSubscription.unsubscribe();
    }
  }
}
