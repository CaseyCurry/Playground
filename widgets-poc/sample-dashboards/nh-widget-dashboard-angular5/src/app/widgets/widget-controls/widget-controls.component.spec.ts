import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetControlsComponent } from './widget-controls.component';

describe('WidgetControlsComponent', () => {
  let component: WidgetControlsComponent;
  let fixture: ComponentFixture<WidgetControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetControlsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
