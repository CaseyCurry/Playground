import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControlsComponent } from './panel-controls.component';

describe('PanelControlsComponent', () => {
  let component: PanelControlsComponent;
  let fixture: ComponentFixture<PanelControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
