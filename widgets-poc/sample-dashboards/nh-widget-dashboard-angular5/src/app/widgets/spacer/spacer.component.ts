import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widgets-panel-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.css']
})
export class SpacerComponent implements OnInit {
  @Input() spacer: object;
  @Output() spacerHovered = new EventEmitter<SpacerComponent>();
  @Output() spacerUnhovered = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('col-12');
  }

  onMouseEnter() {
    this.spacerHovered.emit(this);
  }

  onTouchEnter() {
    this.spacerHovered.emit(this);
  }

  onMouseLeave() {
    this.spacerUnhovered.emit();
  }

  onTouchLeave() {
    this.spacerUnhovered.emit();
  }
}
