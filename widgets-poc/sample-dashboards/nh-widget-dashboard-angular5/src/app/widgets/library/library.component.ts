import { Component, OnInit, Input, Output, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { Library } from '../library.model';
import { Widget } from '../widget.model';

@Component({
  selector: 'app-widgets-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  @Input() library: Library;
  @Output() done = new EventEmitter<void>();
  @Output() renderWidget = new EventEmitter<Widget>();
  @Output() derenderWidget = new EventEmitter<Widget>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('card', 'card-row', 'popup');
  }

  ngAfterViewInit() {
    const width = this.elementRef.nativeElement
      .getBoundingClientRect()
      .width;
    this.elementRef.nativeElement.style.top = (this.library.yPosition - 20) + "px";
    this.elementRef.nativeElement.style.left = (this.library.xPosition - width + 20) + "px";
  }

  onDoneClick(): void {
    this.done.emit();
  }

  onCheckboxChange(libraryWidget: any) {
    if (libraryWidget.isRendered) {
      this.library.derenderWidget(libraryWidget.widget);
      this.derenderWidget.emit(libraryWidget.widget);
    } else {
      this.library.renderWidget(libraryWidget.widget);
      this.renderWidget.emit(libraryWidget.widget);
    }
  }
}
