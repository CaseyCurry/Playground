import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Widget } from '../widget.model';
import { BootstrapService } from '../bootstrap.service';

@Component({
  selector: 'app-widget-drop-target',
  templateUrl: './drop-target.component.html',
  styleUrls: ['./drop-target.component.css']
})
export class DropTargetComponent implements OnInit {
  @Input() dropTarget: Widget;
  @Input() height: number;

  constructor(private elementRef: ElementRef, private bootstrapService: BootstrapService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.elementRef.nativeElement.style.height = this.height + 'px';
    const classes: string[] = this.bootstrapService.getClasses(this.dropTarget);
    this.elementRef.nativeElement.classList.add(...classes);
  }
}
