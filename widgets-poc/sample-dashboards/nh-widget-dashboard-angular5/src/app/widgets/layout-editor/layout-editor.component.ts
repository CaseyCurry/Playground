import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { LayoutEditor } from '../layout-editor.model';

@Component({
  selector: 'app-widgets-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit {
  @Input() layoutEditor: LayoutEditor;
  @Output() done = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('card', 'card-row', 'col-8', 'col-sm-6', 'popup');
  }

  ngAfterViewInit() {
    const width = this.elementRef.nativeElement
      .getBoundingClientRect()
      .width;
    this.elementRef.nativeElement.style.top = (this.layoutEditor.yPosition - 20) + 'px';
    this.elementRef.nativeElement.style.left = (this.layoutEditor.xPosition - width + 20) + 'px';
  }

  onDoneClick(): void {
    this.done.emit();
  }
}
