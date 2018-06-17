import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { BootstrapService } from '../bootstrap.service';

@Component({
  selector: 'app-widget-resize-guideline',
  templateUrl: './resize-guideline.component.html',
  styleUrls: ['./resize-guideline.component.css']
})
export class ResizeGuidelineComponent implements OnInit {
  @Input() guideline: any;
  @Output() resized = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private bootstrapService: BootstrapService) { }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    const thisElement = this.elementRef.nativeElement;
    thisElement.classList.add(this.bootstrapService.columnPrefix + this.guideline.widthOfGuideline);
    thisElement.style.top = (this.guideline.top + window.scrollY) + 'px';
    thisElement.style.height = this.guideline.height + 'px';
  }

  onHover(): void {
    const widget = this.guideline.widget;
    if (this.guideline.targetWidthOfWidget !== this.bootstrapService.getWidth(widget.getCurrentWidth.bind(widget))) {
      this.bootstrapService.resize(this.guideline.widget, this.guideline.targetWidthOfWidget);
      this.resized.emit(this.guideline.widget);
    }
  }
}
