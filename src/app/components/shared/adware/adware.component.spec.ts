import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdwareComponent } from './adware.component';

describe('AdwareComponent', () => {
  let component: AdwareComponent;
  let fixture: ComponentFixture<AdwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
