import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPageComponent } from './sport-page.component';

describe('SportPageComponent', () => {
  let component: SportPageComponent;
  let fixture: ComponentFixture<SportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
