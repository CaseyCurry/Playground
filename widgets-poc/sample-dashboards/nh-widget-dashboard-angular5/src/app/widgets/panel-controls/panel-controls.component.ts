import { Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { Library } from '../library.model';

@Component({
  selector: 'app-widgets-panel-controls',
  templateUrl: './panel-controls.component.html',
  styleUrls: ['./panel-controls.component.css']
})
export class PanelControlsComponent implements OnInit {
  @Output() editLibrary = new EventEmitter<any>();
  @Output() editLayout = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.classList.add('col-12');
  }

  onLibraryClick(event) {
    this.editLibrary.emit(event);
  }

  onLayoutClick(event) {
    this.editLayout.emit(event);
  }
}
