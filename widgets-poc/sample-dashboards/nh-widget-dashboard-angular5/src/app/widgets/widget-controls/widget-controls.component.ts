import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Widget } from '../widget.model';

@Component({
  selector: 'app-widget-controls',
  templateUrl: './widget-controls.component.html',
  styleUrls: ['./widget-controls.component.css']
})
export class WidgetControlsComponent implements OnInit {
  @Input() widget: Widget;
  @Output() close = new EventEmitter<void>();
  @Output() fullscreen = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('col-12');
  }

  onCollapseClick() {
    this.widget.collapse();
  }

  onExpandClick() {
    this.widget.expand();
  }

  onCloseClick() {
    this.close.emit();
  }

  onToggleFullScreenClick() {
    this.fullscreen.emit();
  }
}
