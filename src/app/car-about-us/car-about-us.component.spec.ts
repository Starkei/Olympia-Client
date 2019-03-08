import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAboutUsComponent } from './car-about-us.component';

describe('CarAboutUsComponent', () => {
  let component: CarAboutUsComponent;
  let fixture: ComponentFixture<CarAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
