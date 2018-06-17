import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeGuidelineComponent } from './resize-guideline.component';

describe('ResizeGuidelineComponent', () => {
  let component: ResizeGuidelineComponent;
  let fixture: ComponentFixture<ResizeGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizeGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
